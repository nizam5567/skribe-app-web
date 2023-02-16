import { Box, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ExhibitDetailsEditComponent from './ExhibitDetailsEditComponent';
import PdfViewer from './PdfViewer';
import ReactPlayerComponent from './ReactPlayerComponent';
import CrossIcon from '../../svg-components/CrossIcon';
import GreenTickIcon from '../../svg-components/GreenTickIcon';
import { RecordItem } from '../../types/exhibit';

interface ExhibitDetailsComponentProps {
  title: string
  record: RecordItem | null
  closeExhibitDetails: () => void
  handleRemove?: (record: RecordItem) => void
  action: 'manage' | 'preview' | 'Present'
  handleUpdate: (record: RecordItem) => void
}

const ExhibitDetailsComponent = ({
  title,
  record,
  closeExhibitDetails,
  handleRemove = () => {
    null;
  },
  action,
  handleUpdate
}: ExhibitDetailsComponentProps) => {
  const [isExhibitDeleted, setIsExhibitDeleted] = useState(false);
  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Box
        px={4}
        height={76}
        bgcolor={'#fff'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          'borderBottom': '1px solid #EBEBEA'
        }}
      >
        <Typography variant="h2" component="div" sx={{ 'flexGrow': 1 }}>
          {title}
        </Typography>
        <Box
          pt={1}
          sx={{ 'cursor': 'pointer' }}
          onClick={() => closeExhibitDetails()}
        >
          <CrossIcon />
        </Box>
      </Box>

      <Box pb={20} sx={{ 'overflow': 'auto', 'height': '100%' }}>
        <ExhibitDetailsEditComponent
          isExhibitDeleted={isExhibitDeleted}
          record={record}
          action={action}
          handleUpdate={handleUpdate}
        />

        {isExhibitDeleted ? (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            px={4}
            py={3}
          >
            <GreenTickIcon />
            <Typography variant="body2" ml={1} color="info">
              Exhibit removed successfully!
            </Typography>
          </Box>
        ) : (
          <>
            <Box py={3}>
              {record?.exhibitType === 'video' ? (
                <ReactPlayerComponent />
              ) : record?.exhibitType === 'application' ? (
                // dev env
                <PdfViewer path="./../files/sample-pdf-with-images.pdf" />
              ) : (
                // <PdfViewer path="./files/sample-pdf-with-images.pdf" />
                <Box px={3}>
                  <Box pb={2}>
                    <Typography>Phone Recording 210209-1829.mp3</Typography>
                  </Box>
                  <AudioPlayer />
                </Box>
              )}
            </Box>
            {action === 'manage'
              ? (
              <Box px={3}>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  size="small"
                  onClick={() => {
                    handleRemove(record as RecordItem);
                    setIsExhibitDeleted(true);
                  }}
                >
                  Delete Exhibit
                </Button>
              </Box>
                )
              : (
                  ''
                )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ExhibitDetailsComponent;
