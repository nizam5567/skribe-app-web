import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import axios from 'axios';
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
import { handleApiError } from '../../../util/error-handlers';
import { CreateObjectRequestObjecttypeEnum } from '../../../openapi';

interface UploadFileInfo {
  filename: string
  filesize: number
  mimetype: string
}

const ArchiveModalBody = () => {
  const alert = boundSnackbarActions;
  const handleDropRejection = () => {
    alert.error('Failed to upload file');
  };
  const router = useRouter();
  const { eventId } = router.query;
  const { accessToken } = useAuthContext();
  const acceptedFileExtension = ['.MP4', '.M4V', '.AVI', '.MOV', '.MPG', '.MPEG'];
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ 'multiple': false, 'accept': acceptedFileExtension, 'onDropRejected': handleDropRejection });
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

  const uploadArchiveRecord = async (eventId: string, objectId: string) => {
    try {
      if (accessToken) {
        const uploadService = await getUploadService(accessToken);
        const response: any = await uploadService.objectsControllerTriggerVideoProcessing(eventId, objectId);
        if (response.status === 200) {
          location.reload();
        }
      }
    } catch (error: any) {
      alert.error(error.message);
    }
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
          boundSnackbarActions.success('File is ready to upload.');
          setTimeout(() => {
            dispatch(closeModal());
          }, 2000);
          const binaryStr = reader.result;
          const uploadFileInfo: any = {
            'filename': file.name,
            'filesize': file.size,
            'mimetype': file.type,
            'eventid': Number(eventId),
            'objecttype': CreateObjectRequestObjecttypeEnum.ArchiveVideo
          };
          const getUrlToUploadExhibit = async (uploadFileInfo: any, binaryStr: any) => {
            if (accessToken) {
              try {
                const uploadService = await getUploadService(accessToken);
                const response: any = (await uploadService.objectsControllerCreateMatter(uploadFileInfo)) as any;
                if (response.status === 200 || response.status === 201) {
                  try {
                    axios
                      .request({
                        'method': 'PUT',
                        'url': response.data.url,
                        'data': binaryStr,
                        'headers': {
                          'Content-Type': 'application/octet-stream'
                        },
                        'onUploadProgress': (p) => {
                          const percentage: any = (p.loaded / p.total) * 100;
                          boundSnackbarActions.success(`Uploading... ${parseInt(percentage)}%`);
                        }
                      })
                      .then((data) => {
                        uploadArchiveRecord(`${eventId}`, `${response.data.objectId}`);
                      });
                  } catch (error: any) {
                    alert.error('Failed to upload');
                  }
                } else {
                  alert.error('Failed to upload');
                }
              } catch (error) {
                alert.error('Failed to upload');
              }
            }
          };
          getUrlToUploadExhibit(uploadFileInfo, binaryStr);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  }, [acceptedFiles]);

  return (
    <Box display="flex" flexDirection="column" sx={{ 'width': '100%' }}>
      <Box p={3}>
        <Box {...getRootProps()} sx={{ 'border': '1px dashed #3954E3', 'cursor': 'pointer' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={3}>
          <input {...getInputProps()} />
          <UploadFileIcon />
          <Typography variant="body1" sx={{ 'color': '#01090F', 'maxWidth': '350px' }} p={3}>
            Drag and Drop or Browse to upload
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ArchiveModalBody;
