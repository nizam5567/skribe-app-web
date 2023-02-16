import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LinearDeterminateProps {
  list: any[]
  item: any
}

export default function LinearProgressbar ({ list, item }: LinearDeterminateProps) {
  const [progress, setProgress] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    list.map((i: any) => {
      if (i && item && i?.exhibitid === item?.exhibitid) {
        setPercentage(i?.percentage);
      }
    });
  }, [list, item]);

  React.useEffect(() => {
    setProgress(percentage);
    if (percentage >= 100 || percentage <= 0) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [percentage]);

  return (
    <>
      {item.exhibitid && !isComplete
        ? (
        <Box sx={{ 'width': '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
          )
        : (
        <Box sx={{ 'width': '100%' }}>
          <LinearProgress variant="determinate" value={progress} sx={{ 'display': 'none', 'opacity': 'none' }} />
        </Box>
          )}
    </>
  );
}
