import { Box, Button, Fade, Paper, Popper, Typography } from '@mui/material';
import React from 'react';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import CrossIcon from '../../svg-components/CrossIcon';
import SkribeLogo from '../../svg-components/SkribeLogo';
import { getInvitationLink } from '../../v2/common';
// import { RiFileCopyLine } from "react-icons/ri";
// import { getAssetPrefix } from "../../../util/common";

interface InfoPopperProps {
  anchorEl: HTMLButtonElement | null
  open: boolean
  handleCloseInfo: () => void
}

export default function InfoPopper (props: InfoPopperProps) {
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const { open, anchorEl, handleCloseInfo } = props;
  const alert = boundSnackbarActions;

  const copyLink = () => {
    navigator.clipboard.writeText(getInvitationLink(event));
    alert.success('Link copied.');
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={'bottom-end'}
      transition
      sx={{
        'zIndex': 1000,
        'borderRadius': '4px',
        'boxShadow': '0px 21px 81px rgb(0 0 0 / 10%)'
      }}
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Box
              sx={{
                'cursor': 'pointer',
                'position': 'absolute',
                'top': '16px',
                'right': '16px'
              }}
              onClick={() => handleCloseInfo()}
            >
              <CrossIcon />
            </Box>
            <Box sx={{ 'p': 2, 'width': '500px' }}>
              <Box
                mb={2}
                sx={{
                  'textAlign': 'left',
                  'paddingTop': '20px'
                }}
              >
                <SkribeLogo />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  'fontSize': '1.375rem',
                  'mt': '1rem'
                }}
              >
                {event?.title}
              </Typography>
              <Typography variant="body1">{event?.mattertitle}</Typography>
              <Box
                sx={{
                  'display': 'flex',
                  'columnGap': '1rem',
                  'mt': '1rem'
                }}
              >
                <Typography variant="body1">Scheduler:</Typography>
                <Typography variant="h3">{event?.schedulername}</Typography>
              </Box>
              <Box
                sx={{
                  'display': 'flex',
                  'columnGap': '1rem',
                  'mt': '1rem'
                }}
              >
                <Typography variant="body1">Invite Link:</Typography>
                <Typography
                  variant="h3"
                  sx={{
                    'width': '350px',
                    'whiteSpace': 'nowrap',
                    'overflow': 'hidden',
                    'textOverflow': 'ellipsis'
                  }}
                >
                  {getInvitationLink(event)}
                </Typography>
              </Box>
              <Box
                sx={{
                  'mt': '0.75rem'
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  // startIcon={<RiFileCopyLine />}
                  onClick={() => {
                    copyLink();
                  }}
                  sx={{ 'background': '#02178c' }}
                >
                  Copy Link
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
