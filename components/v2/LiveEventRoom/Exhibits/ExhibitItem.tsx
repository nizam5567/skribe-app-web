import { Box, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getExhibitService } from '../../../../helpers/api-helper';
import { handleApiError } from '../../../../util/error-handlers';
import LiveRoomPreviewExhibitModal from '../../exhibits/LiveRoomPreviewExhibitModal';
import OutsideAlerter from '../../OutsideAlerter';
import ExhibitIcon from '../../svg-components/ExhibitIcon';
import ThreeDotIcon from '../../svg-components/ThreeDotIcon';
import VisibleToAllIcon from '../../svg-components/VisibleToAllIcon';

interface IExhibitItem {
  exhibit: any
}

const ExhibitItem = ({ exhibit }: IExhibitItem) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { accessToken } = useAuthContext();

  const [previewlink, setPreviewlink] = useState<string>('');
  const [mimetype, setMimetype] = useState<string>('');

  const toggleModal = (url?: string, type?: string) => {
    if (url && type) {
      setPreviewlink(url);
      setMimetype(type);
    } else {
      setPreviewlink('');
      setMimetype('');
    }
  };

  const handleOutsideClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  const handleMakeExhibitPublic = async (exhibit: any) => {
    setShowPopup(false);
    if (accessToken) {
      try {
        const service = await getExhibitService(accessToken);
        const response = await service.changeVisibility(exhibit.id, 'PUBLIC');
        if (response.status === 200 || response.status === 201) {
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  return (
    <Fragment>
      {previewlink && <LiveRoomPreviewExhibitModal previewlink={previewlink} mimetype={mimetype} toggleModal={toggleModal} />}

      <Box key={exhibit.id} p={2} alignItems="center" sx={{ 'borderBottom': '1px solid #F1F5F8' }} display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-start" style={{ 'cursor': 'pointer' }} onClick={() => toggleModal(exhibit?.previewlink, exhibit?.mimetype)}>
          <ExhibitIcon />
          <Box alignSelf="start">
            <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#1E1E1E', 'width': '100%' }}>
              {exhibit?.title}
            </Typography>
            <Typography ml={1} sx={{ 'fontSize': '12px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#7C8286', 'width': '100%' }}>
              {exhibit?.partyname}
            </Typography>
          </Box>
        </Box>
        <OutsideAlerter handleClose={handleOutsideClick}>
          <Box position="relative">
            <Box p={1} display="flex" justifyContent="center" alignItems="center" sx={{ 'borderRadius': '50%', 'width': '30px', 'height': '30px', 'cursor': 'pointer', '&:hover': { 'background': '#e6e6e6', 'borderRadius': '50%', 'width': '30px', 'height': '30px' } }}>
              <ThreeDotIcon />
            </Box>
            {showPopup && (
              <Box borderRadius={1} p={1} position="absolute" top={25} right={0} sx={{ 'border': '1px solid #e6e6e6', 'background': '#fff' }} onClick={async () => await handleMakeExhibitPublic(exhibit)}>
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
                  <VisibleToAllIcon />
                  <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '17px', 'color': '#01090F', 'whiteSpace': 'nowrap', 'cursor': 'pointer' }}>
                    Introduce to Record
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </OutsideAlerter>
      </Box>
    </Fragment>
  );
};

export default ExhibitItem;
