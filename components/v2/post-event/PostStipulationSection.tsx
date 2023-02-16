import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { RootState } from '../../../redux/store/store';
import { getTenantIdFromLocalStorage } from '../common';
import SecondaryButton from '../SecondaryButton';
import PartyStipulationStatus from '../stipulation/PartyStipulationStatus';
import PreviewStipulation from '../stipulation/PreviewStipulation';
import DocumentIcon from '../svg-components/DocumentIcon';
import PlusIcon from '../svg-components/PlusIcon';
import SmallDownloadIcon from '../svg-components/SmallDownloadIcon';
import StipulationPDFIcon from '../svg-components/StipulationPDFIcon';

interface IStipulationSection {
  partyDataFound: boolean
}

const PostStipulationSection = ({ partyDataFound }: IStipulationSection) => {
  const { event } = useSelector((state: RootState) => state?.eventReducer);
  const { parties } = useSelector((state: RootState) => state.partiesReducer);
  const userTenantId: number | undefined = getTenantIdFromLocalStorage();
  const [stipulation, setStipulation] = useState<string>('none');
  const dispatch = useDispatch();
  const handleStipulation = () => {
    dispatch(openModal('stipulation'));
  };

  useEffect(() => {
    if (event?.stipulation) {
      setStipulation(event.stipulation.toLowerCase() || 'none');
    }
  }, [event]);

  const handlePreviewClick = () => {
    dispatch(openModal('previewStipulation'));
  };

  return (
    <Box borderRadius={2} px={3} py={4.5} mb={1.5} sx={{ 'background': '#fff', 'border': '1px solid #E8EBF2', 'boxShadow': '-4px 8px 24px rgba(44, 63, 88, 0.02)' }}>
      <PreviewStipulation />

      <Box display="flex" justifyContent={'space-between'} alignItems="flex-start" sx={{ 'flexDirection': { 'xs': 'column-reverse', 'md': 'row' }, 'borderBottom': '1px solid #e6e6e6' }} pb={2}>
        <Box>
          <Typography sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A' }}>Stipulation</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} ml={3}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box display="flex" alignItems="center">
            <StipulationPDFIcon />
            <Box ml={1}>
              <Typography sx={{ 'fontSize': '20px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A', 'whiteSpace': 'nowrap' }}>{stipulation === 'none' ? 'No' : stipulation === 'default' ? 'Default' : 'Custom'} Stipulation</Typography>
            </Box>
          </Box>
          {stipulation === 'custom' && (
            <Box display="flex">
              <Box display="flex" alignItems="center" mt={2} sx={{ 'cursor': 'pointer', 'border': '1px solid #e6e6e6', 'borderRadius': 1, 'p': 1 }} mr={2} onClick={handlePreviewClick}>
                <Typography sx={{ 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '15px', 'color': '#3F434A;' }}>View</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={2} sx={{ 'cursor': 'pointer', 'border': '1px solid #e6e6e6', 'borderRadius': 1, 'pl': 1 }}>
                <SmallDownloadIcon />
                <Typography component={'a'} sx={{ 'ml': 0.5, 'fontSize': '12px', 'fontWeight': 400, 'lineHeight': '15px', 'color': '#3F434A', 'p': 1, 'pl': 0 }} href={event?.previewlink} download={'stipulation'}>
                  Download
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {partyDataFound && parties && parties.length >= 2
          ? (
          <PartyStipulationStatus />
            )
          : !partyDataFound
              ? (
          <Box p={2} pt={4} display="flex" flex={1} justifyContent="center" alignItems="center" sx={{ 'background': '#fff', 'borderTop': '1px solid #fff' }}>
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

export default PostStipulationSection;
