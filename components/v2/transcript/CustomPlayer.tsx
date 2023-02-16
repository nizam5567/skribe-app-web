import { Box, Stack, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

interface ICustomPlayer {
  videoUrl: string
  starttime: number
  endtime: number
  playClip: boolean
  setPlayClip: Function
}

const CustomPlayer = ({ videoUrl, starttime, endtime, playClip, setPlayClip }: ICustomPlayer) => {
  // videoUrl = 'https://video-clip-input.s3.us-west-2.amazonaws.com/transcript-demo/GMT20220708-143118_Recording_avo_640x360.mp4';

  const playerRef = useRef<any>();
  const timeRef = useRef<any>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffering, setBuffering] = useState(false);
  useEffect(() => {
    if (playClip) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [playClip]);

  const progressHandler = (state: any) => {
    timeRef.current = state.playedSeconds;
    if (endtime <= state.playedSeconds) {
      console.log('stop', endtime, state.playedSeconds);
      setPlaying(false);
    }
  };

  const playbackHandler = (value: number) => {
    playerRef?.current?.seekTo(value);
  };

  useEffect(() => {
    console.log('starttime', starttime);
    playbackHandler(starttime);
  }, [starttime]);

  return (
    <Box sx={{ 'height': '50%', 'position': 'relative' }}>
      {buffering && (
        <Box sx={{ 'position': 'absolute', 'top': 0, 'left': 0, 'right': 0, 'bottom': 0, 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'background': 'rgba(0,0,0,0.5)' }}>
          <Stack display="flex" direction="column" alignItems="center" justifyContent="center" sx={{ 'height': '100%' }}>
            <CircularProgress size="2rem" sx={{ 'color': '#fff' }} />
          </Stack>
        </Box>
      )}
      <ReactPlayer
        height="100%"
        ref={(ref: any) => {
          playerRef.current = ref;
        }}
        url={videoUrl}
        onProgress={progressHandler}
        controls={true}
        width={'100%'}
        playing={playing}
        onPlay={() => setPlaying(true)}
        style={{ 'backgroundColor': '#000' }}
        onBuffer={() => setBuffering(true)}
        onBufferEnd={() => setBuffering(false)}
      />
    </Box>
  );
};
export default CustomPlayer;
