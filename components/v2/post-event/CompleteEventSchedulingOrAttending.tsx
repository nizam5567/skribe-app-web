import { Box, Typography, Card, CardContent, CardHeader, Button, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import Logo from './Logo';

interface CompleteEvent {
  title: string
  matterId: number
  eventId: number
}

const CompleteEventSchedulingOrAttending = ({ title, matterId, eventId }: CompleteEvent) => {
  const router = useRouter();

  const cardStyle = {
    'display': 'block',
    'width': '60vw',
    'height': '43vw',
    'margin': 'auto',
    'marginTop': '40px'
  };
  return (
        <Box textAlign={'center'}>
            <Card style={cardStyle}>
                <CardHeader
                    sx={{ 'marginTop': '50px' }}
                    title={title}
                />
                <Logo />
                <CardContent>
                    <Typography variant="h3" color="text.primary">
                        You successfully left
                    </Typography>
                    <Typography sx={{ 'marginTop': '25px' }} variant="h6" color="text.primary">
                    You will find the Rough AI Transcript, Exhibits, and Video Clipping Tool in your Skribe account for this event.
                    </Typography>
                </CardContent>
                <CardActions sx={{ 'justifyContent': 'center' }}>
                    <Button sx={{ 'textTransform': 'none', 'background': '#02178c' }} variant="contained" color="primary" onClick={async () => await router.push(`/event/${matterId}/${eventId}`)}>Go to The Record</Button>
                </CardActions>
            </Card>
        </Box>
  );
};

export default CompleteEventSchedulingOrAttending;
