import { Box, Hidden, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getInvitationLink } from '../common';
import CopyIcon from '../svg-components/CopyIcon';
import IconWrapper from './IconWrapper';

interface IInvitationLinkWrapper {
  icon: React.ReactNode
  title: string
  data: string
  name: string
}
const InvitationLinkWrapper = ({ icon, title, data, name }: IInvitationLinkWrapper) => {
  const alert = boundSnackbarActions;
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const [invitationLink, setInvitationLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (event) {
      setInvitationLink(getInvitationLink(event));
    }
  }, [event]);

  const copyToClipboard = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink);
      alert.success('Invitation link copied!');
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{}}>
      <IconWrapper icon={icon} />
      <Box sx={{ 'width': '90%' }}>
        <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#8A9099' }}>{title}</Typography>
        <Box display="flex">
          <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A', 'overflow': 'hidden', 'textOverflow': 'ellipsis', 'whiteSpace': 'nowrap' }}>{event && event.eventcode ? getInvitationLink(event) : 'Not available'}</Typography>
          {event && event.eventcode && (
            <Box display="flex" ml={3} sx={{ 'cursor': 'pointer' }} onClick={copyToClipboard}>
              <CopyIcon />
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '17px', 'color': '#3F434A' }} ml={0.5}>
                Copy
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InvitationLinkWrapper;
