import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/reducers/modalReducer/modalAction';

const CreateNewMatterButton = () => {
  const dispatch = useDispatch();

  const handleCreateMatter = () => {
    dispatch(openModal('matter'));
  };
  return (
    <Box>
      <Button variant="contained" size="medium" sx={{ 'background': '#02178c', 'padding': '10px 20px', 'whiteSpace': 'nowrap' }} onClick={handleCreateMatter}>
        Create New Matter
      </Button>
    </Box>
  );
};

export default CreateNewMatterButton;
