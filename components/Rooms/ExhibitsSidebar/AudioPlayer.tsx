import { Box } from '@mui/material';

const AudioPlayer = () => (
    <Box>
      <audio
        controls
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        style={{ 'width': '100%' }}
      ></audio>
    </Box>
);

export default AudioPlayer;
