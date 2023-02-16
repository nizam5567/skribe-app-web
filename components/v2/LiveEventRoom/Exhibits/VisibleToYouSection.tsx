import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { ExhibitResponse } from '../../../../openapi';
import { useAppSelector } from '../../../../redux/store/hooks';
import { RootState } from '../../../../redux/store/store';
import VisibleToYouIcon from '../../svg-components/VisibleToYouIcon';
import ExhibitItem from './ExhibitItem';

const VisibleToYouSection = () => {
  const { visibleToPartyExhibits } = useAppSelector((state: RootState) => state?.exhibitReducer);

  return (
    <Box pb={4} sx={{ 'height': 'calc(100% - 150px)' }}>
      <Box p={2} sx={{ 'borderBottom': '1px solid #F1F5F8' }} display="flex" justifyContent="flex-start" alignItems="center">
        <VisibleToYouIcon />
        <Typography ml={1} sx={{ 'fontSize': '12px', 'fontWeight': 500, 'lineHeight': '15px', 'color': '#3954E3' }}>
          Only Visible to You
        </Typography>
      </Box>
      <Box sx={{ 'overflow': 'auto', 'height': '100%' }}>
        {visibleToPartyExhibits && visibleToPartyExhibits.length > 0
          ? (
              visibleToPartyExhibits.map((exhibit: ExhibitResponse) => <ExhibitItem key={exhibit.id} exhibit={exhibit} />)
            )
          : !visibleToPartyExhibits
              ? (
          <Box pt={2} display="flex" justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'height': '60vh' }}>
            <Stack display="flex" direction="column" alignItems="center" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Box>
                )
              : null}
      </Box>
    </Box>
  );
};

export default VisibleToYouSection;
