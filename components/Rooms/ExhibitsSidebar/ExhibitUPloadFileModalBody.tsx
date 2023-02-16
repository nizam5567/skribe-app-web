import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadFileIcon from '../../svg-components/UploadFileIcon';
import ExhibitFileItemComponent from './ExhibitFileItemComponent';
import ExhibitFileNameEditComponent from './ExhibitFileNameEditComponent';
import { Stipulation } from '../../types/exhibit';
import { AcceptedMimeTypes } from '../../../consts/exhibitConsts';

interface ExhibitUploadFileModalBodyProps {
  types: String[]
  fileInfo: Stipulation
  handleModalClose: () => void
  handleUpload: (cb: () => void) => void
  fileUploadStatus: boolean
  acceptedFileExtension: string[]
  handleRemove: () => void
  defaultSelected?: boolean
  handleDefault?: (value: any) => void
  setFileInfo: (data: Stipulation) => void
  setFileBinaryContent: (data: any) => void
  uploadExhibit: (acceptedFilesInfo: any) => void
}

const ExhibitUploadFileModalBody = ({ types, handleModalClose, handleUpload, fileUploadStatus, fileInfo, setFileInfo, handleRemove, acceptedFileExtension, defaultSelected = false, handleDefault, setFileBinaryContent, uploadExhibit }: ExhibitUploadFileModalBodyProps) => {
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false, accept: acceptedFileExtension });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    'multiple': false
  });
  const [stipulationRemoved, setStipulationRemoved] = useState(false);
  const [filesAdded, setFilesAdded] = useState(false);
  const [stipulationFileInfo, setStipulationFileInfo] = useState(fileInfo);
  const [exhibitFileInfo, setExhibitFileInfo] = useState(fileInfo);

  const [defaultActive, setDefaultActive] = useState(false);

  useEffect(() => {
    setDefaultActive(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    debugger;
    setFilesAdded(false);
    acceptedFiles.length ? setFilesAdded(true) : setFilesAdded(false);
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          const binaryStr = reader.result;
          setFileBinaryContent(binaryStr);
        };
        reader.onloadend = () => {
          uploadExhibit(acceptedFiles[0]);
        };
        reader.readAsArrayBuffer(file);
      });
      setFileInfo({
        ...fileInfo,
        'fileSize': acceptedFiles[0].size,
        'mimeType': acceptedFiles[0].type as AcceptedMimeTypes
      });
    }
  }, [acceptedFiles]);

  const handelfileUpload = ({ exhibitName, fileName }: { exhibitName: string, fileName: string }, cb: () => void) => {
    handleUpload(cb);
  };

  const handleRemoveFromModal = () => {
    setFilesAdded(false);
    setStipulationRemoved(true);
    {
      fileUploadStatus ? handleRemove() : null;
    }
  };

  const handleSwitch = (value: boolean) => {
    if (handleDefault) {
      handleDefault(value);
    }
    value ? setDefaultActive(value) : setDefaultActive(value);
  };

  return (
    <>
      <Box position="relative" sx={{ 'width': '100%' }}>
        {filesAdded || fileUploadStatus
          ? (
          <Box sx={{ 'width': '100%' }}>
            <ExhibitFileItemComponent handleStipulationRemove={handleRemoveFromModal} stipulationFileInfo={fileInfo} />
            <Box m={3} mt={2} ml={4} textAlign="left" display="flex" justifyContent="flex-start" alignItems="center">
              <ExhibitFileNameEditComponent handleUpload={handelfileUpload} closeModal={handleModalClose} recordExhibitName={fileInfo.exhibitName as string} recordFileName={fileInfo.fileName as string} />
            </Box>
          </Box>
            )
          : (
          <Box display="flex" flexDirection="column" p={4} sx={{ 'width': '100%' }}>
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
            )}
      </Box>
    </>
  );
};

export default ExhibitUploadFileModalBody;
