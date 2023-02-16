import { Box, Button, Typography } from '@mui/material';
import PdfIcon from '../../svg-components/PdfIcon';

interface keyable {
  [key: string]: any
}

interface FileItemComponentProps {
  handleStipulationRemove?: (arg: any) => void
  stipulationFileInfo: keyable
}

const FileItemComponent = ({
  handleStipulationRemove,
  stipulationFileInfo
}: FileItemComponentProps) => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={3}
      sx={{ 'width': '100%', 'borderBottom': 1, 'borderColor': 'divider' }}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ 'width': '100%' }}
      >
        <PdfIcon />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="subtitle2">
            {stipulationFileInfo?.fileName}
          </Typography>
          <Box display="flex">
            <Typography variant="body1" color="secondary">
              {stipulationFileInfo?.fileOwner}
            </Typography>
            <Box ml={1} sx={{ 'borderLeft': 1, 'borderColor': 'divider' }}>
              <Typography variant="body1" color="secondary" pl={1}>
                {stipulationFileInfo?.fileSize}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
);

export default FileItemComponent;
