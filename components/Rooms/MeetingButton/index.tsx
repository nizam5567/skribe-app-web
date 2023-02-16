import { Box, Button, ButtonProps, Typography } from '@mui/material';
import ClipIcon from '../../svg-components/ClipIcon';

interface MeetingButtonProps {
  icon: React.ReactNode
  label: string
  opacity?: string
}

export default function MeetingButton (props: MeetingButtonProps & ButtonProps) {
  const { icon, label, opacity, ...others } = props;

  return (
    <Button {...others} sx={{ 'height': 45, 'pt': 0.5, 'pb': 0.5, 'px': 1 }}>
      <Box
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'color': 'secondary.main',
          'alignItems': 'center',
          'height': '100%',
          'justifyContent': 'space-between',
          'opacity': opacity || '1'
        }}
      >
        {icon}
        <Typography variant="body2" sx={{ 'lineHeight': 1.2 }}>
          {label}{' '}
        </Typography>
      </Box>
    </Button>
  );
}
