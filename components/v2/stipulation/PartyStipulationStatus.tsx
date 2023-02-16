import { Box, Typography } from '@mui/material';
import { PartyResponse } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import AgreedIcon from '../svg-components/AgreedIcon';
import WaitingIcon from '../svg-components/WaitingIcon';

const PartyStipulationStatus = () => {
  const { parties } = useAppSelector((state: RootState) => state.partiesReducer);
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" sx={{ 'width': '100%' }} ml={10}>
      <Box display="flex" flex={1} sx={{ 'width': '100%' }} mb={3}>
        <Box display="flex" justifyContent="space-between" sx={{ 'width': '100%' }}>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'width': '50%' }}>PARTY</Typography>
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#8A9099', 'width': '50%' }}>STATUS</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" flex={1} sx={{ 'width': '100%' }}>
        {parties &&
          parties.map((party: PartyResponse) => {
            if (party.partytype && party.partytype.toLowerCase() !== 'scheduling') {
              return (
                <Box key={party.id} mb={1.5} display="flex" alignItems="center">
                  <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '22px', 'color': '#3F434A', 'width': '50%' }}>{party.name}</Typography>
                  {party.stipulationstatus === 'WAITING' && (
                    <Box sx={{ 'width': '50%' }} display="flex" alignItems="center">
                      <WaitingIcon />
                      <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A', 'width': '50%', 'ml': 1.5, 'whiteSpace': 'nowrap' }}>Awaiting Agreement</Typography>
                    </Box>
                  )}
                  {party.stipulationstatus === 'AGREED' && (
                    <Box sx={{ 'width': '50%' }} display="flex" alignItems="center">
                      <AgreedIcon />
                      <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A', 'width': '50%', 'ml': 1.5, 'whiteSpace': 'nowrap' }}>Agreed</Typography>
                    </Box>
                  )}
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default PartyStipulationStatus;
