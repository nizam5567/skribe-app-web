import { Box, Typography, Card, CardContent, CardHeader } from '@mui/material';
import Logo from './Logo';

interface CompleteEvent {
  title: string
}

const CompleteEventGuestOrWitness = ({ title }: CompleteEvent) => {
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
                        You can safely close this page.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
  );
};

export default CompleteEventGuestOrWitness;
