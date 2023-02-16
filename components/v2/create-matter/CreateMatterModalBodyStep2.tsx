import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import ArchiveCreateEventWithName from '../create-event/ArchiveCreateEventWithName';
import CreateEventWithName from '../create-event/CreateEventWithName';

const CreateMatterModalBodyStep2 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateEvent = () => {
    dispatch(closeModal());
    router.push('/home');
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Box p={3} pt={0} width={'100%'} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
      {/* <Typography textAlign="left" sx={{ fontSize: "16px", fontWeight: "300", lineHeight: "18px" }}>
        Now, let&apos;s add an event in this Matter.
      </Typography> */}
      <CreateEventWithName />
      {/* <ArchiveCreateEventWithName /> */}
    </Box>
  );
};

export default CreateMatterModalBodyStep2;
