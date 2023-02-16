import { Box } from '@mui/material';
import { useAuthContext } from '../../../contexts/AuthContext';
import { ExhibitResponse } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import ExhibitListItem from './ExhibitListItem';

const ExhibitList = () => {
  const { accessToken } = useAuthContext();
  const { exhibits, publicExhibits } = useAppSelector((state: RootState) => state.exhibitReducer);
  return (
    <Box>
      {exhibits &&
        exhibits.length > 0 &&
        exhibits.map((exhibit: ExhibitResponse, index: number) => <ExhibitListItem key={exhibit.id} exhibit={exhibit} />)}
    </Box>
  );
};

export default ExhibitList;
