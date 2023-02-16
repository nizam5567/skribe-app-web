import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { PartyResponse } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import AgreedIcon from '../svg-components/AgreedIcon';
import ErrorIcon from '../svg-components/ErrorIcon';
import WaitingIcon from '../svg-components/WaitingIcon';

const PartyList = () => {
  const { parties } = useAppSelector((state: RootState) => state.partiesReducer);

  return (
    <Box>
      {parties &&
        parties.length &&
        parties.map((party: PartyResponse, index: number) => {
          if (party.partytype && party.partytype.toLowerCase() !== 'scheduling') {
            return (
              <Box key={party.id} display="flex" py={2} flexDirection={{ 'xs': 'column', 'md': 'row' }} alignItems="center" sx={{ 'borderBottom': '1px solid #E8E9EB' }}>
                <Typography width="25%" sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>
                  {party?.name}
                </Typography>
                <Typography width="25%" sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A' }}>
                  {party?.email || 'Not available'}
                </Typography>
                <Box mb={1.5} display="flex" alignItems="center" sx={{ 'width': '50%' }}>
                  <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '22px', 'color': '#3F434A', 'width': '50%' }}>{party.name}</Typography>
                  {party.stipulationstatus === 'WAITING' && (
                    <Box sx={{ 'width': '50%' }} display="flex" alignItems="center">
                      <WaitingIcon />
                      <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A', 'width': '50%', 'ml': 1.5, 'whiteSpace': 'nowrap' }}>Awaiting Acceptance</Typography>
                    </Box>
                  )}
                  {party.stipulationstatus === 'AGREED' && (
                    <Box sx={{ 'width': '50%' }} display="flex" alignItems="center">
                      <AgreedIcon />
                      <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '18px', 'color': '#3F434A', 'width': '50%', 'ml': 1.5, 'whiteSpace': 'nowrap' }}>Accepted</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          }
        })}
    </Box>
  );
};

export default PartyList;
