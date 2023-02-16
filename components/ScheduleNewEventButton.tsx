import Link from 'next/link';
import { Button } from '@mui/material';
import ArrowWhiteIcon from './svg-components/ArrowWhiteIcon';

const ScheduleNewEventButton = () => (
    <Link href="/events/new">
      <Button
        endIcon={<ArrowWhiteIcon />}
        variant="contained"
        size="large"
        sx={{
          'height': '38px',
          'width': '246px',
          'justifyContent': 'flex-start',
          '.MuiButton-endIcon': {
            'display': 'inherit',
            'marginLeft': '50px !important',
            'marginRight': '-6px !important'
          },
          '.MuiButtonBase-root-MuiButton-root': {
            'padding': '0.6rem 0rem !important'
          }
        }}
      >
        Create New Event
      </Button>
    </Link>
);

export default ScheduleNewEventButton;
