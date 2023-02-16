import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getMatterService } from '../../../helpers/api-helper';
import { MatterResponse, MattersResponse } from '../../../openapi/models';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { handleApiError } from '../../../util/error-handlers';
import CreateMatterComponent from '../create-matter/CreateMatterComponent';
import CreateNewMatterButton from '../CreateNewMatterButton';
import SearchContainer from '../navigation/search/SearchContainer';
import EmptyPage from './EmptyPage';
import MatterCard from './MatterCard';

const MattersContainer = () => {
  const { searchMatter } = useAppSelector((state: RootState) => state.mattersReducer);
  const { matters } = useAppSelector((state: RootState) => state.mattersReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { accessToken } = useAuthContext();
  const getMatters = async () => {
    try {
      if (accessToken) {
        setIsLoading(true);
        const matterService = await getMatterService(accessToken);
        const matterResult: MattersResponse = (await matterService.getMatters()).data;
        const matters: MatterResponse[] = matterResult.matters ? matterResult.matters : [];
        boundMattersActions.storeMatters(matters);
        setIsLoading(false);
      }
    } catch (error: any) {
      handleApiError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (matters === undefined) {
      getMatters();
    }
  }, [accessToken]);

  return (
    <Box>
      <CreateMatterComponent matterList={matters || []} />
      {isLoading
        ? (
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '80vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
          )
        : !matters || matters?.length === 0
            ? (
        <EmptyPage />
              )
            : (
        <Fragment>
          <Box display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
            <Typography sx={{ 'fontSize': '28px', 'lineHeight': '34px', 'fontWeight': 500, 'whiteSpace': 'nowrap' }} my={2}>
              Your Matters
            </Typography>
            <Box display="flex" alignItems="center">
              <Box display="flex" sx={{ 'maxWidth': '700px', 'width': '100%', 'minWidth': '500px' }}>
                <SearchContainer />
              </Box>
              <Box sx={{ 'marginTop': { 'xs': 2, 'md': 0 }, 'ml': 2 }}>
                <CreateNewMatterButton />
              </Box>
            </Box>
          </Box>
          {searchMatter && <MatterCard matter={searchMatter} index={0} />}
          {!searchMatter &&
            matters &&
            matters.map((matter: MatterResponse, index: number) => <MatterCard key={matter?.id} matter={matter} index={index} />)}
        </Fragment>
              )}
    </Box>
  );
};

export default MattersContainer;
