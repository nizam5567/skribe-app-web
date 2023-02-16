import { default as _ReactPlayer } from 'react-player';
import { ReactPlayerProps } from 'react-player/types/lib';
import { useState, useRef } from 'react';
import { Container } from '@mui/material';
import PlayerControls from './PlayerControls';
import styles from './ReactPlayerComponent.module.scss';

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const format = (seconds: number) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }

  return `${mm}:${ss}`;
};

interface ReactPlayerComponentProps {
  exhibit?: any
  url?: any
}

const ReactPlayerComponent = ({ exhibit, url }: ReactPlayerComponentProps) => {
  const [state, setState] = useState({
    'playing': true,
    'muted': false,
    'volume': 0.5,
    'playbackRate': 1.0,
    'played': 0,
    'seeking': false
  });

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<any>(null);

  const handlePlayPause = () => {
    setState({ ...state, 'playing': !state.playing });
  };

  const handleMute = () => {
    setState({ ...state, 'muted': !state.muted });
  };

  const handleVolumeChange = (event: any, newValue: number) => {
    setState({
      ...state,
      'volume': parseFloat((newValue / 100) as any),
      'muted': newValue === 0
    });
  };

  const handleVolumeSeekUp = (event: any, newValue: any) => {
    setState({
      ...state,
      'volume': parseFloat((newValue / 100) as any),
      'muted': newValue === 0
    });
  };

  const handlePlaybackRateChange = (rate: any) => {
    setState({ ...state, 'playbackRate': rate });
  };

  const toggleFullScreen = () => {
    // screenfull.toggle(playerContainerRef.current);
  };

  const handleProgress = (changeState: any) => {
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (event: any, newValue: number) => {
    setState({ ...state, 'played': parseFloat((newValue / 100) as any) });
  };

  const handleSeekMouseDown = (event: any) => {
    setState({ ...state, 'seeking': true });
  };

  const handleSeekMouseUp = (event: any, newValue: number) => {
    setState({ ...state, 'seeking': false });
    playerRef.current.seekTo(newValue / 100);
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  return (
    <div className={styles['event-video']}>
      <Container maxWidth="md">
        <div
          ref={playerContainerRef}
          className={'classes.playerWrapper'}
          style={{
            'width': '100%',
            'position': 'relative',
            'borderRadius': '10px',
            'overflow': 'hidden'
          }}
        >
          <ReactPlayer ref={playerRef} width={'100%'} height="100%" url={exhibit?.previewlink || url || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'} muted={muted} playing={playing} volume={volume} playbackRate={playbackRate} onProgress={handleProgress} />

          <PlayerControls
            onPlayPause={handlePlayPause}
            playing={playing}
            muted={muted}
            onMute={handleMute}
            onVolumeChange={(event: any, value: any) => handleVolumeChange(event, value)}
            onVolumeSeekUp={(event: any, value: any) => handleVolumeSeekUp(event, value)}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRateChange}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            // onRewind={handleRewind}
          />
        </div>
      </Container>
    </div>
  );
};

export default ReactPlayerComponent;
