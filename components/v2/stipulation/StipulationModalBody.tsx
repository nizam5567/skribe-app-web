import { Box, Radio, Stack, Typography, Button, CircularProgress, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getEventService, getUploadService } from '../../../helpers/api-helper';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { handleApiError } from '../../../util/error-handlers';
import BlueAlertIcon from '../svg-components/BlueAlertIcon';
import UploadFileIcon from '../svg-components/UploadFileIcon';
import PdfIcon from '../../svg-components/PdfIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getTenantIdFromLocalStorage } from '../common';
import { CreateObjectRequestObjecttypeEnum, UpdateEventRequest } from '../../../openapi';
import { boundEventsActions } from '../../../redux/reducers/eventReducer/eventAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';

interface UploadFileInfo {
  filename: string
  filesize: number
  mimetype: string
  tenantid: any
  eventid: number
  bucketlocation: string
}

const StipulationModalBody = () => {
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const dispatch = useDispatch();
  const acceptedFileTypes = ['pdf', 'docs'];
  const acceptedFileExtension = ['.pdf', '.doc', '.docx'];
  const { event } = useAppSelector((state: RootState) => state?.eventReducer);
  const [stipulationType, setStipulationType] = useState<any>(event?.stipulation || 'NONE');
  const [userStipulationSelectionInModal, setUserStipulationSelectionInModal] = useState(event?.stipulation || 'NONE');
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false);
  const [showUploadField, setShowUploadField] = useState<boolean>(false);
  const [stipulationObjectId, setStipulationObjectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ 'multiple': false, 'accept': acceptedFileExtension });

  useEffect(() => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => {};
        reader.onerror = () => {};
        reader.onload = () => {};
        reader.onloadend = () => {
          const binaryStr = reader.result;
          handleUpload(file, binaryStr);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  }, [acceptedFiles]);

  const handleUpload = async (acceptedFilesInfo: any, fileBinaryContent: any) => {
    const uploadFileInfo: any = {
      'filename': acceptedFilesInfo?.name,
      'filesize': acceptedFilesInfo?.size,
      'mimetype': acceptedFilesInfo?.type,
      'tenantid': getTenantIdFromLocalStorage(),
      'eventid': 0,
      'bucketlocation': '',
      'objecttype': CreateObjectRequestObjecttypeEnum.Stipulation
    };
    if (accessToken) {
      try {
        setIsUploading(true);
        const uploadService = await getUploadService(accessToken);
        const response: any = (await uploadService.objectsControllerCreateMatter(uploadFileInfo)) as any;
        setStipulationObjectId(response?.data?.objectId);
        try {
          axios
            .request({
              'method': 'PUT',
              'url': response?.data?.url,
              'data': fileBinaryContent,
              'headers': {
                'Content-Type': 'application/octet-stream'
              },
              'onUploadProgress': (p: any) => {}
            })
            .then((data) => {
              setIsUploading(false);
              setUploadSuccessful(true);
              setShowUploadField(false);
            });
        } catch (error) {
          alert.error('Server error');
        }
      } catch (error) {
        alert.error('Server error');
      }
    }
  };

  const handleReplace = () => {
    setShowUploadField(true);
  };

  const controlProps = (item: string) => ({
    'checked': stipulationType === item,
    'onChange': (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserStipulationSelectionInModal(event.target.value);
    },
    'value': item,
    'name': 'size-radio-button-demo',
    'inputProps': { 'aria-label': item }
  });

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const handleSave = () => {
    setStipulationType(userStipulationSelectionInModal);
    if (event) {
      const updateValues: any = {
        'matterid': event?.matterid,
        'title': event?.title,
        'id': event?.id,
        'tenantid': event?.tenantid,
        'datestart': event?.datestart,
        'timezone': event?.timezone,
        'duration': event?.duration,
        'invited': event?.invited,
        'exhibit': event?.exhibit,
        'eventtype': event?.eventtype,
        'stipulation': userStipulationSelectionInModal
      };

      if (userStipulationSelectionInModal === 'custom' && stipulationObjectId) {
        updateValues.stipulationobjectid = stipulationObjectId;
      }
      if (event) {
        updateStipulation(event.id, updateValues);
      }
    }
  };

  const updateStipulation = async (eventId: number, values: any) => {
    if (accessToken) {
      try {
        setIsLoading(true);
        const eventService = await getEventService(accessToken);
        const eventResponse: any = await eventService.updateEvent(eventId, values);
        if (eventResponse.status === 200 || eventResponse.status === 201) {
          boundEventsActions.storeEvent({ ...event, ...eventResponse.data });
          boundEventsActions.updateEvent(eventResponse.data);
          boundMattersActions.updateEventUnderMatter({ ...event, ...eventResponse.data });
          setIsLoading(false);
          dispatch(closeModal());
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" width="100%" sx={{ 'overflowY': 'auto' }}>
      <Box px={2} py={1.5} borderBottom={1} borderColor="divider" sx={{ 'width': '100%' }} display="flex" alignItems="space-between">
        <Box display="flex" alignItems="center">
          <Radio {...controlProps('NONE')} size="medium" checked={userStipulationSelectionInModal === 'NONE'} />
          <Stack display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300 }}>No Stipulation</Typography>
          </Stack>
        </Box>
      </Box>
      <Box px={2} py={1.5} borderBottom={1} borderColor="divider" sx={{ 'width': '100%', 'paddingRight': '30px' }} display="flex" justifyContent="space-between" alignItems="center">
        <Stack display="flex" flexDirection="row" alignItems="center">
          <Radio {...controlProps('default')} size="medium" checked={userStipulationSelectionInModal === 'default'} />
          <Typography sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300 }}>Skribe Default Stipulation</Typography>
        </Stack>
        <Box display="flex" alignItems="center" sx={{ 'cursor': 'pointer', 'border': '1px solid #e6e6e6', 'borderRadius': 1, 'pl': 1 }}>
          <Typography component={'a'} sx={{ 'ml': 0.5, 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '15px', 'color': '#3F434A', 'p': 1, 'pl': 0 }} target="_blank" href={`https://${process.env.NEXT_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/stipulation/Stipulations+%E2%80%93+2022.07.27.pdf`} download={'stipulation'}>
            View
          </Typography>
        </Box>
      </Box>
      <Box position="relative" sx={{ 'width': '100%' }}>
        <Box px={2} py={1.5} sx={{ 'width': '100%', 'paddingRight': '30px' }} display="flex" justifyContent="space-between" alignItems="center">
          <Stack display="flex" flexDirection="row" alignItems="center">
            <Radio {...controlProps('custom')} checked={userStipulationSelectionInModal === 'custom'} />
            <Typography sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300 }}>Upload Your Own</Typography>
          </Stack>
        </Box>
        {userStipulationSelectionInModal === 'custom' || event?.stipulation === 'custom'
          ? (
              (uploadSuccessful && !showUploadField) || (event?.stipulation === 'custom' && !showUploadField)
                ? (
            <Box sx={{ 'width': '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={3} pt={0}>
                <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ 'width': '100%' }}>
                  <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <PdfIcon />
                    <Box display="flex" flexDirection="column" justifyContent="flex-start" align-items="flex-start" textAlign="left">
                      <Typography sx={{ 'color': '#1E1E1E', 'fontSize': '14px', 'lineHeight': '14px' }}>Custom Stipulation</Typography>
                      <Box display="flex" sx={{ 'marginTop': '8px' }}>
                        <Typography sx={{ 'color': '#7C8286', 'fontSize': '12px', 'lineHeight': '12px' }} pr={1}>
                          Skribe, Inc.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button variant="outlined" disableElevation color="info" sx={{ 'padding': '10px 20px', 'marginRight': '5px', 'background': '#F5F6F7', 'color': '#01090F', 'fontWeight': 100, 'lineHeight': '14px', 'fontSize': '14px' }} onClick={handleReplace}>
                    Replace
                  </Button>
                </Box>
              </Box>
            </Box>
                  )
                : (
            <Box display="flex" flexDirection="column" p={4} pt={0} sx={{ 'width': '100%' }}>
              <Box {...getRootProps()} sx={{ 'border': '1px dashed #3954E3', 'cursor': 'pointer' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={3}>
                <input {...getInputProps()} />
                <UploadFileIcon />
                <Typography variant="body1" sx={{ 'color': '#01090F', 'maxWidth': '250px' }} p={3}>
                  Drag and Drop your files here
                  <Typography sx={{ 'display': 'block' }}>
                    (Or{' '}
                    <Box component="span" sx={{ 'color': '#3954E3' }}>
                      click{' '}
                    </Box>
                    to upload)
                  </Typography>
                </Typography>
              </Box>
              {isUploading && <LinearProgress />}
            </Box>
                  )
            )
          : null}
      </Box>

      {userStipulationSelectionInModal === 'NONE' || userStipulationSelectionInModal === 'default' || (userStipulationSelectionInModal === 'custom' && uploadSuccessful && !showUploadField)
        ? (
        <Box px={4} py={2} borderTop={1} borderColor="divider" sx={{ 'width': '100%' }} display="flex" flexDirection="column" alignItems="flex-start">
          <Box display="flex" flex={1} justifyContent="flex-start" alignItems="flex-start" sx={{ 'padding': '24px', 'background': '#D1D3D520', 'borderRadius': '4px', 'margin': '0px 0 16px', 'width': '100%' }}>
            <BlueAlertIcon />
            <Typography sx={{ 'fontSize': '12px', 'lineHeight': '16px', 'fontWeight': 300, 'marginLeft': '8px', 'textAlign': 'left' }}>Saving your selection now will NOT email the other side yet.</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ 'marginBottom': '12px' }}>
            <Button variant="contained" color="primary" sx={{ 'fontSize': '14px', 'color': '#ffffff', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '13px 21px', 'background': '#02178c' }} onClick={handleSave} startIcon={isLoading && <CircularProgress size="1rem" color="inherit" />} disabled={isLoading}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ 'fontSize': '14px', 'lineHeight': '14px', 'fontWeight': 300, 'padding': '10px 20px', 'marginLeft': '12px' }}
              onClick={() => {
                handleModalClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
          )
        : null}
    </Box>
  );
};

export default StipulationModalBody;
