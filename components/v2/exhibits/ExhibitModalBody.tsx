import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getUploadService } from '../../../helpers/api-helper';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import UploadFileIcon from '../svg-components/UploadFileIcon';
import { IExhibit } from '../../../interface/IExhibit';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import CrossIcon from '../../svg-components/CrossIcon';
import DocumentIcon from '../svg-components/DocumentIcon';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { boundExhibitsActions } from '../../../redux/reducers/exhibitReducer/exhibitAction';
import { getTenantIdFromLocalStorage } from '../common';
import { CreateObjectRequestObjecttypeEnum } from '../../../openapi';

interface UploadFileInfo {
  filename: string
  filesize: number
  mimetype: string
}

const ExhibitModalBody = () => {
  const alert = boundSnackbarActions;
  const handleDropRejection = () => {
    alert.error('Failed to upload file');
  };
  const router = useRouter();
  const { eventId } = router.query;
  const { accessToken } = useAuthContext();
  const acceptedFileExtension = ['.png', '.jpg', '.jpeg', '.xlsx', '.xlsm', '.xlsb', '.xltx', '.xltm', '.xls', '.xlt', '.xml', '.xlam', '.xla', '.xlw', '.xlr', '.prn', '.txt', '.csv', '.dif', '.slk', '.dbf', '.ods', '.pdf', '.xps', '.doc', '.docx', '.pptx', '.pptm', '.ppt', '.potx', '.potm', '.pot', '.ppsx', '.ppsm', '.pps', '.ppa', '.ppam', '.MP4', '.M4V', '.AVI', '.MOV', '.mp3', '.weba', '.vlc'];
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ 'multiple': true, 'accept': acceptedFileExtension, 'onDropRejected': handleDropRejection });
  const acceptedFileTypes = ['Video, Audio or File'];

  const { exhibits, tempExhibits } = useAppSelector((state: RootState) => state?.exhibitReducer);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleExhibitUpload = () => {
    boundExhibitsActions.readyToUploadTempExhibit(true);
    dispatch(closeModal());
  };

  useEffect(() => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file: any, index: number) => {
        const reader = new FileReader();
        reader.onabort = () => {
          console.log('on abort');
        };
        reader.onerror = () => {
          console.log('on error');
        };
        reader.onload = () => {
          console.log('on load');
        };
        reader.onloadend = () => {
          const binaryStr = reader.result;
          const uploadFileInfo: any = {
            'filename': file.name,
            'filesize': file.size,
            'mimetype': file.type,
            'eventid': Number(eventId),
            'objecttype': CreateObjectRequestObjecttypeEnum.Exhibit
          };
          const getUrlToUploadExhibit = async (uploadFileInfo: any, binaryStr: any) => {
            if (accessToken) {
              try {
                const uploadService = await getUploadService(accessToken);
                const response: any = (await uploadService.objectsControllerCreateMatter(uploadFileInfo)) as any;
                const newExhibit: IExhibit = {
                  'id': undefined,
                  'status': undefined,
                  'objectid': Number(`${response?.data?.objectId}`),
                  'partyid': undefined,
                  'eventid': Number(eventId),
                  'tenantid': getTenantIdFromLocalStorage(),
                  'fileNameInUserEnd': uploadFileInfo?.filename,
                  // exhibitname: `Exhibit-${response?.data?.objectId}`,
                  // title: `Exhibit-${response?.data?.objectId}`,
                  'exhibitname': uploadFileInfo?.filename,
                  'title': uploadFileInfo?.filename,
                  'description': `${response?.data?.fileName}`,
                  'filename': `${response?.data?.fileName}`,
                  'filesize': uploadFileInfo?.filesize,
                  'mimetype': uploadFileInfo?.mimetype,
                  'uploadUrl': response.data.url,
                  'binaryContent': binaryStr,
                  'exhibitid': uuidv4(),
                  'isReadyToUpload': false
                };
                if (response.status === 200 || response.status === 201) {
                  boundExhibitsActions.createTempExhibit(newExhibit);
                } else {
                  alert.error(`Failed to upload ${newExhibit?.filename}`);
                }
              } catch (error) {
                alert.error(`Failed to upload ${file.name}`);
              }
            }
          };
          getUrlToUploadExhibit(uploadFileInfo, binaryStr);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  }, [acceptedFiles]);

  const handleDeleteExhibit = (exhibitid: string) => {
    boundExhibitsActions.deleteTempExhibit(exhibitid);
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ 'width': '100%' }}>
      <Box p={3}>
        <Box {...getRootProps()} sx={{ 'border': '1px dashed #3954E3', 'cursor': 'pointer' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={3}>
          <input {...getInputProps()} />
          <UploadFileIcon />
          <Typography variant="body1" sx={{ 'color': '#01090F', 'maxWidth': '350px' }} p={3}>
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
      </Box>
      <Box sx={{ 'width': '100%' }}>
        <Box sx={{ 'overflow': 'auto', 'maxHeight': '300px' }}>
          {tempExhibits &&
            tempExhibits.length !== 0 &&
            tempExhibits.map((exhibit: IExhibit, index: number) => {
              if (!exhibit.isReadyToUpload) {
                return (
                  <Box key={exhibit?.exhibitid} display="flex" justifyContent="space-between" alignItems="center" p={1} sx={{ 'width': '100%', 'borderTop': 1, 'borderColor': 'divider' }}>
                    <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ 'width': '100%' }}>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" position="relative" sx={{ 'width': '100%' }}>
                        <Box
                          position="absolute"
                          top={15}
                          right={10}
                          sx={{ 'cursor': 'pointer' }}
                          onClick={() => {
                            handleDeleteExhibit(exhibit?.exhibitid);
                          }}
                        >
                          <CrossIcon />
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ 'width': '100%' }}>
                          <Box p={1} sx={{ 'borderRight': '1px solid #e6e6e6', 'ml': 1 }}>
                            <DocumentIcon />
                          </Box>
                          <Box ml={1} p={1} display="flex" flexDirection="column" justifyContent={'flex-start'} alignItems={'flex-start'}>
                            <Typography sx={{ 'fontSize': '16px', 'fontWeight': '500', 'lineHeight': '24px', 'color': '#616161' }}>{exhibit?.fileNameInUserEnd}</Typography>
                            {/* <Typography sx={{ fontSize: "14px", fontWeight: "100", lineHeight: "20px", color: "#616161" }}>{exhibit?.fileNameInUserEnd}</Typography> */}
                            <Typography sx={{ 'fontSize': '14px', 'fontWeight': '100', 'lineHeight': '20px', 'color': '#616161' }}>{(Number(exhibit?.filesize / 1000) / 1000).toFixed(1)} MB</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            })}
        </Box>
        {tempExhibits && tempExhibits.length !== 0
          ? (
          <Box px={3} py={2} textAlign="left" display="flex" justifyContent="space-between" alignItems="center" sx={{ 'borderTop': '1px solid #e6e6e6' }}>
            <Box>
              <Button variant="contained" disableElevation color="primary" onClick={handleExhibitUpload} size="medium" sx={{ 'background': '#02178c' }}>
                Upload
              </Button>

              <Button variant="outlined" disableElevation color="secondary" sx={{ 'marginLeft': '15px' }} onClick={handleCancel} size="medium">
                Cancel
              </Button>
            </Box>
          </Box>
            )
          : null}
      </Box>
    </Box>
  );
};

export default ExhibitModalBody;
