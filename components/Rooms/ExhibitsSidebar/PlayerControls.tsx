import { Bookmark, FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import { Tooltip, Slider, Grid, Typography, Button, IconButton, Popover, styled, duration } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PlayerControls.module.scss';
import MediaPlayIcon from '../../svg-components/MediaPlayIcon';
import VolumeUpIcon from '../../svg-components/VolumeUpIcon';
import VolumeOffIcon from '../../svg-components/VolumeOffIcon';

const PrettoSlider = styled(Slider)({
  'root': {
    'height': 8
  },
  'thumb': {
    'height': 24,
    'width': 24,
    'backgroundColor': '#fff',
    'border': '2px solid currentColor',
    'marginTop': -8,
    'marginLeft': -12,
    '&:focus, &:hover, &$active': {
      'boxShadow': 'inherit'
    }
  },
  'active': {},
  'valueLabel': {
    'left': 'calc(-50% + 4px)'
  },
  'track': {
    'height': 8,
    'borderRadius': 4
  },
  'rail': {
    'height': 8,
    'borderRadius': 4
  }
});

interface PlayerCotrolsProps {
  onPlayPause: () => void
  playing: boolean
  // onRewind: () => void;
  muted: boolean
  onMute: () => void
  onVolumeChange: (event: any, newValue: any) => void
  onVolumeSeekUp: (event: any, newValue: any) => void
  volume: number
  playbackRate: number
  onPlaybackRateChange: (rate: any) => void
  onToggleFullScreen: () => void
  played: any
  onSeek: (event: any, value: number) => void
  onSeekMouseDown: (event: any) => void
  onSeekMouseUp: (event: any, value: number) => void
  elapsedTime: any
  totalDuration: any
}

const PlayerCotrols = ({
  onPlayPause,
  playing,
  muted,
  onMute,
  onVolumeChange,
  onVolumeSeekUp,
  volume,
  playbackRate,
  onPlaybackRateChange,
  onToggleFullScreen,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration
}: PlayerCotrolsProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playbackrate-popover' : undefined;
  return (
    <div className={styles['controls-wrapper']}>
      {/* Top controls */}
      {/* <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "#fff" }}>
            Video Title
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Bookmark />}
          >
            Bookmark
          </Button>
        </Grid>
      </Grid> */}

      {/* middle controls */}

      {/* <Grid container direction="row" alignItems="center" justifyContent="center">
        <IconButton
          //onClick={onRewind}
          className={styles.controlIcons} aria-label="reqind">
          <FastRewind fontSize="inherit" />
        </IconButton>

        <IconButton
          onClick={onPlayPause}
          className={styles.controlIcons} aria-label="reqind">
          {playing ? (
            <Pause fontSize="inherit" />
          ) : (
            <PlayArrow fontSize="inherit" />
          )}
        </IconButton>

        <IconButton className={styles.controlIcons} aria-label="reqind">
          <FastForward fontSize="inherit" />
        </IconButton>
      </Grid> */}

      {/* bottom controls */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ 'padding': '5px 15px', 'backgroundColor': '#1E1E1E' }}
      >
        {/* <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            size="small"
            valueLabelDisplay="on"
            valueLabelFormat={elapsedTime}
            // ValueLabelComponent={(props: any) => (
            //   <ValueLabelComponent {...props} value={elapsedTime} />
            // )}
            onChange={(e: any, value: any) => onSeek(e, value)}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={(e: any, value: any) => onSeekMouseUp(e, value)}
          />
        </Grid> */}

        <Grid item xs>
          <Grid container alignItems="center" direction="row">
            <Grid item>
              <IconButton
                onClick={onPlayPause}
                className={styles['bottom-icons']}
                sx={{ 'width': 40 }}>
                {playing ? (
                  <Pause fontSize="medium" />
                ) : (
                  // <PlayArrow fontSize="large" />
                  <MediaPlayIcon />
                )}

              </IconButton>
            </Grid>
            <Grid item xs>
              <div style={{ 'position': 'relative', 'padding': '0 15px' }}>
                <div style={{ 'position': 'absolute', 'top': '-15px', 'right': '5px' }}>
                  <Button variant="text" style={{ 'color': '#fff', 'marginLeft': 16 }}>
                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                  </Button>
                </div>
                <PrettoSlider
                  min={0}
                  max={100}
                  value={played * 100}
                  size="small"
                  valueLabelDisplay="on"
                  valueLabelFormat={elapsedTime}
                  // ValueLabelComponent={(props: any) => (
                  //   <ValueLabelComponent {...props} value={elapsedTime} />
                  // )}
                  onChange={(e: any, value: any) => onSeek(e, value)}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={(e: any, value: any) => onSeekMouseUp(e, value)}
                  sx={{
                    'color': '#fff', // : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                      'border': 'none'
                    },
                    '& .MuiSlider-thumb': {
                      'width': 15,
                      'height': 15,
                      'backgroundColor': '#B4892D', // '#fff',
                      '&:before': {
                        'boxShadow': '0 4px 8px rgba(0,0,0,0.4)'
                      },
                      '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        'boxShadow': 'none'
                      }
                    }
                  }}
                />
              </div>
            </Grid>

          </Grid>
        </Grid>
        <Grid item>

          <Grid container direction={'row'} alignItems={'center'}>

            <Grid item>
              <div style={{ 'position': 'relative' }}>

                <IconButton
                  onClick={onMute}
                  className={styles['bottom-icons']}>
                  {muted ? (<VolumeOffIcon />) : (<VolumeUpIcon />)}
                </IconButton>

                <div style={{ 'position': 'absolute', 'top': '-12px', 'right': '-175%', 'width': '100px' }}
                className={styles['volume-slider-section']}>
                  <Slider
                    min={0}
                    max={100}
                    value={volume * 100}
                    className={styles['volume-slider']}
                    size="small"
                    onChange={onVolumeChange}
                    onChangeCommitted={onVolumeSeekUp}
                    sx={{
                      'color': '#fff', // : 'rgba(0,0,0,0.87)',
                      '& .MuiSlider-track': {
                        'border': 'none'
                      },
                      '& .MuiSlider-thumb': {
                        'width': 15,
                        'height': 15,
                        'backgroundColor': '#B4892D', // '#fff',
                        '&:before': {
                          'boxShadow': '0 4px 8px rgba(0,0,0,0.4)'
                        },
                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                          'boxShadow': 'none'
                        }
                      }
                    }}
                  />
                </div>

              </div>
            </Grid>
            <Grid item>
              <Button
                onClick={handlePopover}
                variant="text"
                className={styles['bottom-icons']}
              >
                <Typography>1X</Typography>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  'vertical': 'top',
                  'horizontal': 'center'
                }}
                transformOrigin={{
                  'vertical': 'bottom',
                  'horizontal': 'center'
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate, index) => (
                    <Button key={index}
                      onClick={() => onPlaybackRateChange(rate)}
                      variant="text">
                      <Typography color="secondary">{rate}</Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <IconButton
                onClick={onToggleFullScreen}
                className={styles['bottom-icons']}>
                <Fullscreen fontSize="medium" />
              </IconButton>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
};

export default PlayerCotrols;
