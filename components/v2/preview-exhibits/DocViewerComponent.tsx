import { Box, CircularProgress, Stack } from '@mui/material';
import { useState } from 'react';
import { DocumentViewer } from 'react-documents';

interface DocViewerComponentProps {
  document?: any
  url?: string
}

const DocViewerComponent = ({ document, url }: DocViewerComponentProps) => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const handleFileLoad = () => {
    setFileLoaded(true);
  };
  return (
    <Box display="flex" justifyContent={'center'} alignItems={'center'} sx={{ 'height': '100%', 'width': '100%', 'flexDirection': 'column' }}>
      {!fileLoaded && (
        <Stack display="flex" direction="row" alignItems="center" justifyContent="center" mt="30%" style={{}}>
          <CircularProgress size="2rem" />
        </Stack>
      )}
      <DocumentViewer url={url || document?.previewlink} loaded={handleFileLoad} />
    </Box>
  );
};

export default DocViewerComponent;
