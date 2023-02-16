import { Grid, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getParticipantService } from '../../../helpers/api-helper';
import { handleApiError } from '../../../util/error-handlers';
import OutsideAlerter from '../../v2/OutsideAlerter';
import ThreeDotIcon from '../../v2/svg-components/ThreeDotIcon';

interface IGuestWitnessNameCard {
  tag: string
  participant: any
}
const GuestWitnessNameCard = ({ tag, participant }: IGuestWitnessNameCard) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { accessToken } = useAuthContext();
  const handleOutsideClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  const changeRole = async () => {
    const formattedObject = {
      ...participant,
      'role': participant.role === 'GUEST' ? 'WITNESS' : 'GUEST'
    };

    if (accessToken) {
      try {
        const service = await getParticipantService(accessToken);
        const response = await service.changeParticipantRole(formattedObject);
        console.log('changeRole', response);
        setShowPopup(false);
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  return (
    <Grid item xs={3}>
      <Box display="flex" justifyContent="flex-end" sx={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'background': '#fff', 'zIndex': 10 }}>
        <OutsideAlerter handleClose={handleOutsideClick}>
          <Box position="relative" sx={{ 'zIndex': 100 }}>
            <Box p={1} display="flex" justifyContent="center" alignItems="center" sx={{ 'borderRadius': '50%', 'width': '30px', 'height': '30px', 'cursor': 'pointer', '&:hover': { 'background': '#e6e6e6', 'borderRadius': '50%', 'width': '30px', 'height': '30px' } }}>
              <ThreeDotIcon />
            </Box>
            {showPopup && (
              <Box borderRadius={1} p={1} position="absolute" top={35} right={20} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff', 'zIndex': 110 }} onClick={changeRole}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  p={1}
                  borderRadius={1}
                  sx={{
                    'cursor': 'pointer',
                    '&:hover': {
                      'background': '#F1F5F8'
                    }
                  }}
                >
                  {/* <VisibleToAllIcon /> */}
                  {tag === 'witness' || tag === 'guest'
                    ? (
                    <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#01090F', 'whiteSpace': 'nowrap', 'cursor': 'pointer' }}>
                      Make {tag === 'witness' ? 'Guest' : tag === 'guest' ? 'Witness' : ''}
                    </Typography>
                      )
                    : null}
                </Box>
              </Box>
            )}
          </Box>
        </OutsideAlerter>
      </Box>
    </Grid>
  );
};

export default GuestWitnessNameCard;
