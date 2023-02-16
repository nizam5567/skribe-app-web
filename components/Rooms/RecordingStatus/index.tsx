import { Box, Typography } from '@mui/material';
import React from 'react';
import { toHHMMSS } from '../../../util/timerUtils';
import OffRecordIcon from '../../svg-components/OffRecordIcon';
import OnRecordIcon from '../../svg-components/OnRecordIcon';

interface RecordingStatusProps {
  isRecording: boolean
  duration: number
}

export default function RecordingStatus (props: RecordingStatusProps) {
  const { isRecording, duration } = props;

  return (
    <Box sx={{ 'display': 'flex', 'alignItems': 'center', 'height': '100%' }}>
      {isRecording
        ? (
        <Box display="flex" sx={{ 'columnGap': '0.5rem', 'alignItems': 'center' }}>
          <OnRecordIcon />
          <Typography variant="subtitle1" color="secondary.light">
            Recording:
          </Typography>
          <Typography variant="subtitle1">{toHHMMSS(duration)}</Typography>
        </Box>
          )
        : (
        <Box display="flex" sx={{ 'columnGap': '0.5rem', 'alignItems': 'center' }}>
          <OffRecordIcon />
          <Typography variant="subtitle1" color="secondary.light">
            Currently Off the Record
          </Typography>
        </Box>
          )}
    </Box>
  );
}
