import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ExhibitEditIcon from '../../svg-components/ExhibitEditIcon';

interface ExhibitFileNameEditComponentProps {
  handleUpload?: (args: any, callback?: any) => void
  closeModal?: () => void
  handleClose?: () => void
  recordFileName: string
  recordExhibitName: string
}

const ExhibitFileNameEditComponent = ({
  handleUpload,
  closeModal,
  handleClose,
  recordFileName,
  recordExhibitName
}: ExhibitFileNameEditComponentProps) => {
  const [exhibitName, setExhibitName] = useState(
    recordExhibitName ?? 'Exhibit-1911'
  );
  const [fileName, setFileName] = useState(
    recordFileName ?? 'Dashcam Video 210209-1829'
  );

  useEffect(() => {
    setFileName(recordFileName);
    setExhibitName(recordExhibitName);
  }, [recordFileName, recordExhibitName]);

  const [exhibitNameEditing, setExhibitNameEditing] = useState(false);
  const [fileNameEditing, setFileNameEditing] = useState(false);

  const handleExhibitNameChange = (e: any) => {
    setExhibitName(e.target.value);
  };

  const handleFileNameChange = (e: any) => {
    setFileName(e.target.value);
  };

  const handleUpdate = () => {
    setExhibitNameEditing(false);
    setFileNameEditing(false);
    if (handleUpload) {
      handleUpload({ exhibitName, fileName }, closeModal);
    }
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <Box sx={{ 'flex': 1 }}>
      <Box mb={3}>
        <Box>
          {exhibitNameEditing
            ? (
            <TextField
              id="filled-basic"
              label="Exhibit Name"
              variant="filled"
              InputProps={{ 'disableUnderline': true }}
              fullWidth
              sx={{ 'background': '#F5F6F7' }}
              value={exhibitName}
              onChange={handleExhibitNameChange}
            />
              )
            : (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1.3}
              sx={{ 'background': '#F5F6F7', 'borderRadius': '4px' }}
            >
              <Typography variant="caption" color="secondary.light">
                Exhibit Name
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1" mr={1}>
                  {exhibitName}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => setExhibitNameEditing(true)}
                  sx={[
                    { 'cursor': 'pointer' },
                    {
                      '&:hover': {
                        'cursor': 'pointer',
                        'backgroundColor': '#EBEBEA',
                        'borderRadius': '50%'
                      }
                    }
                  ]}
                >
                  <ExhibitEditIcon />
                </Box>
              </Box>
            </Box>
              )}
        </Box>
        <Box mt={2}>
          {fileNameEditing
            ? (
            <TextField
              id="filled-basic"
              label="File Name"
              variant="filled"
              InputProps={{ 'disableUnderline': true }}
              fullWidth
              sx={{ 'background': '#F5F6F7' }}
              value={fileName}
              onChange={handleFileNameChange}
            />
              )
            : (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1.3}
              sx={{ 'background': '#F5F6F7', 'borderRadius': '4px' }}
            >
              <Typography variant="caption" color="secondary.light">
                File Name
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1" mr={1}>
                  {fileName}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => setFileNameEditing(true)}
                  sx={[
                    { 'cursor': 'pointer' },
                    {
                      '&:hover': {
                        'cursor': 'pointer',
                        'backgroundColor': '#EBEBEA',
                        'borderRadius': '50%'
                      }
                    }
                  ]}
                >
                  <ExhibitEditIcon />
                </Box>
              </Box>
            </Box>
              )}
        </Box>
      </Box>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={handleUpdate}
        size="small"
      >
        Update
      </Button>
    </Box>
  );
};

export default ExhibitFileNameEditComponent;
