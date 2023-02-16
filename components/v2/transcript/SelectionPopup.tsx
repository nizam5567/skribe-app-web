import { Box, Typography } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import OutsideAlerter from '../OutsideAlerter';
import MakeClipIcon from '../svg-components/MakeClipIcon';
import PlayClipIcon from '../svg-components/PlayClipIcon';

interface ISelectionPopup {
  top: any
  left: any
  setPlayClip: Function
  setMakeClip: Function
  handleVideoPosition: Function
  tmpStartTime?: any
  tmpEndTime?: any
}
const SelectionPopup = ({ top, left, setPlayClip, setMakeClip, handleVideoPosition, tmpStartTime, tmpEndTime }: ISelectionPopup) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleSelectionPopupClose = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowPopup(false);
      setPlayClip(false);
    } else {
      setShowPopup(true);
      setPlayClip(false);
    }
  };

  useEffect(() => {
    if (top && left && tmpStartTime && tmpEndTime) {
      setShowPopup(true);
    }
  }, [top]);

  const handleMakeClip = () => {
    setMakeClip(true);
    setShowPopup(false);
  };

  const handlePlayClip = () => {
    setPlayClip(true);
    setShowPopup(false);
    handleVideoPosition();
  };

  return (
    <Fragment>
      <Box mx={2} display="flex" justifyContent="center" alignItems="center" position="absolute" top={top} left={left} boxShadow={3} sx={{ 'zIndex': 2000 }}>
        <OutsideAlerter handleClose={handleSelectionPopupClose}>
          <Box>
            {showPopup && (
              <Box sx={{ 'background': '#fff', 'padding': 1, 'borderRadius': 1 }}>
                <Box sx={{ 'cursor': 'pointer', 'borderRadius': 1, '&:hover': { 'background': '#EAEDFF' } }} p={1} display="flex" alignItems="center" onClick={handleMakeClip}>
                  <MakeClipIcon />
                  <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '22px', 'color': '#01090F' }}>
                    Make Clip
                  </Typography>
                </Box>
                <Box sx={{ 'cursor': 'pointer', 'borderRadius': 1, '&:hover': { 'background': '#EAEDFF' } }} p={1} display="flex" alignItems="center" onClick={handlePlayClip}>
                  <PlayClipIcon />
                  <Typography ml={1} sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '22px', 'color': '#01090F' }}>
                    Play Clip
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

export default SelectionPopup;
