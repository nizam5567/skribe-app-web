import { LinearProgress, Box, styled, Typography } from '@mui/material';
import { FC } from 'react';

interface ILinearProgressbarWithLabel {
  progress: number
}
const LinearProgressbarWithLabel: FC<ILinearProgressbarWithLabel> = ({ progress }) => {
  const LinearProgressbarWrapper = styled(Typography)(({ theme }) => ({
    'width': '70%',
    '.MuiLinearProgress-barColorPrimary': {
      'background': '#02178C'
    },
    [theme.breakpoints.down('xl')]: {
      'width': '90%'
    },
    [theme.breakpoints.down('lg')]: {
      'width': '100%'
    }
  }));

  const ProgressText = styled(Typography)(() => ({
    'fontWeight': 400,
    'fontSize': '22px',
    'lineHeight': '33px',
    'color': '#3F434A',
    'marginTop': '16px'
  }));

  return (
    <Box sx={{ 'width': '100%', 'marginTop': '60px' }}>
      <Box sx={{ 'display': 'flex', 'flexDirection': 'column' }}>
        <LinearProgressbarWrapper >
          <LinearProgress variant="determinate" value={progress} sx={{ 'height': '8px', 'background': '#E9E9E9;', 'borderRadius': '100px' }}/>
        </LinearProgressbarWrapper>
        <Box>
          <ProgressText >{`${Math.round(progress)}% completed`}</ProgressText>
        </Box>
      </Box>
    </Box>
  );
};

export default LinearProgressbarWithLabel;
