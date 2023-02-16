import { Box } from '@mui/material';

interface AudioPlayerProps {
  exhibit: any
}

const AudioPlayer = ({ exhibit }: AudioPlayerProps) => (
    <Box>
      <audio controls src={exhibit?.previewlink} style={{ 'width': '100%' }}></audio>
      {/* <audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" style={{ width: "100%" }}></audio> */}
    </Box>
);

export default AudioPlayer;
