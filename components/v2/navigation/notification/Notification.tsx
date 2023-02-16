import { Box } from '@mui/material';
import NotificationIcon from '../../svg-components/NotificationIcon';

const Notification = () => (
    <Box mx={2} display="flex" justifyContent="center" alignItems="center">
      <Box
        mt={0.5}
        sx={{
          'cursor': 'pointer',
          '&:hover': {
            'color': '#02178c'
          }
        }}
      >
        <NotificationIcon />
      </Box>
    </Box>
);

export default Notification;
