import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { ExhibitResponse } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import ExhibitListItemPublic from './ExhibitListItemPublic';

const ExhibitListPublic = () => {
  const { publicExhibits } = useAppSelector((state: RootState) => state.exhibitReducer);
  const [sortedExhibits, setSortedExhibits] = useState<any>();

  useEffect(() => {
    if (publicExhibits) {
      const sortedData = publicExhibits.sort((a: any, b: any) => a.updatedat - b.updatedat);
      setSortedExhibits(sortedData);
    }
  }, [publicExhibits]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ 'width': '100%' }}>
      {sortedExhibits &&
        sortedExhibits.map((exhibit: ExhibitResponse, index: number) => <ExhibitListItemPublic key={exhibit.id} exhibit={exhibit} exhibitNumber={index + 1} />)}
    </Box>
  );
};

export default ExhibitListPublic;
