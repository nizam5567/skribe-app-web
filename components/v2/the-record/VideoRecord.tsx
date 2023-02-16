import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';

const VideoRecord = () => {
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const router = useRouter();

  const { clips } = useAppSelector((store) => store.clipsReducer);

  return (
        <Box>
            <Typography sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>The Record</Typography>
            <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '21px', 'color': '#616161' }} mt={1.5}>
                Synced video, searchable transcript, clips & sharing
            </Typography>

            <Box mt={2}>
                <Typography
                    sx={{ 'fontSize': '14px', 'fontWeight': 400, 'color': '#3F434A' }}
                    mt={5}
                    justifySelf={'center'}
                >
                    Total Clips: {clips?.length || 0}
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography
                    sx={{
                      'fontSize': '16px',
                      'lineHeight': '18px',
                      'fontWeight': '300',
                      'cursor': 'pointer',
                      'border': '1px solid #7C8286',
                      'borderRadius': 1,
                      'padding': '10px',
                      'color': '#fff',
                      'width': 250,
                      'textAlign': 'center',
                      'backgroundColor': '#02178C'
                    }}
                    onClick={async () => await router.push(`/event/transcript/${event.id}`)}
                >
                    Make Clips from Transcript
                </Typography>
            </Box>
        </Box>
  );
};
export default VideoRecord;
