import { Box } from '@mui/material';
import { useState } from 'react';
import OutsideAlerter from '../../OutsideAlerter';
import SettingsIcon from '../../svg-components/SettingsIcon';
import SettingsDropdown from './SettingsDropdown';

const Settings = () => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const handleSettingsIconClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowSettingsDropdown(false);
    } else {
      setShowSettingsDropdown(true);
    }
  };

  return (
    <Box mx={2} display="flex" justifyContent="center" alignItems="center">
      <OutsideAlerter handleClose={handleSettingsIconClick}>
        <Box mt={0.5}>
          <Box
            sx={{
              '&:hover': {
                'cursor': 'pointer',
                'color': '#02178c'
              }
            }}
          >
            <SettingsIcon />
          </Box>
          {showSettingsDropdown && (
            <Box position="absolute" top={{ 'xs': '126px', 'md': '76px' }} left={0} right={0}>
              <SettingsDropdown />
            </Box>
          )}
        </Box>
      </OutsideAlerter>
    </Box>
  );
};

export default Settings;
