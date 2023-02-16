import { Badge, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PartyCard from './PartyCard';
import UserIcon from '../../svg-components/UserIcon';
import { BouncingCircle } from '../BouncingCircle';

interface ParticipantsSidebarOldProps {
  onClose: () => void
}

function ParticipantsSidebarOld (props: ParticipantsSidebarOldProps) {
  const { onClose } = props;

  const eventParticipants = useSelector((state: any) => state?.roomsEventParticipantsReducer?.participants);
  console.log('eventParticipants', eventParticipants);
  // const eventId = meetingData.eventId as number;

  /**
   * Default view is to show accepted participants
   * If it is false, we will show panding participants
   */
  const [showDefault, setShowDefault] = useState(true);

  const pendingParticipants = useMemo(() => eventParticipants.filter(
    (participant: any) => participant.status === 'invited'
  ), [eventParticipants]);

  const pendingCount = useMemo(() => pendingParticipants.length, [pendingParticipants]);

  const acceptedParticipants = useMemo(() => eventParticipants.filter(
    (participant: any) => participant.status === 'accepted'
  ), [eventParticipants]);

  // useEffect(() => {
  //   if (eventParticipants.length > 0 && eventPartiesData.length > 0) {
  //   }
  // }, [eventPartiesData, eventParticipantsData]);

  const gotoPendingParticipants = () => {
    setShowDefault(false);
  };

  const gotoAcceptedParticipants = () => {
    setShowDefault(true);
  };

  const handleAccept = () => {

  };

  const handleDecline = () => {

  };

  const topNavigation = useMemo(() => {
    if (showDefault) {
      return (
        <>
          <Box position="absolute" left="-22px">
            <BouncingCircle />
          </Box>

          <Typography
            variant="h4"
            sx={{ 'color': 'primary.dark', 'p': 0.5, 'ml': 1 }}
          >
            Pending Participants
          </Typography>
          <Badge badgeContent={pendingCount.toString()} color="primary">
            <Box component="span" sx={{ 'width': 0, 'height': 0, 'ml': '1.5rem' }} />
          </Badge>

          <Box sx={{ 'ml': 'auto' }}>
            <IconButton onClick={gotoPendingParticipants} size="small">
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </>
      );
    }
    return (
        <>
          <Box sx={{}}>
            <IconButton onClick={gotoAcceptedParticipants} size="small">
              <NavigateBeforeIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" sx={{ 'color': 'primary.dark' }}>
            Event Participant
          </Typography>
        </>
    );
  }, [showDefault, pendingCount]);

  return (
    <Box
      sx={{
        'width': '100%',
        'overflowY': 'auto',
        'overflow': 'visible',
        'display': 'flex',
        'flexDirection': 'column'
      }}
    >
      <Box
        sx={{
          'position': 'relative',
          'display': 'flex',
          'py': '1.5rem',
          'px': '1rem',
          'alignItems': 'center'
        }}
      >
        <UserIcon />
        <Typography variant="h4">
          Participants ({eventParticipants.length})
        </Typography>
        <Box position="absolute" sx={{ 'top': '0.5rem', 'right': '0.5rem' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          'bgcolor': 'grey.100',
          'display': 'flex',
          'p': 2,
          'alignItems': 'center',
          'position': 'relative'
        }}
      >
        {topNavigation}
      </Box>
      <Box
        sx={{
          'px': '1rem',
          'py': '1.5rem',
          'display': 'flex',
          'flexDirection': 'column',
          'rowGap': '1rem'
        }}
      >
        {showDefault
          ? (
          <>
            <PartyCard
              title="Event Witness"
              participants={acceptedParticipants}
            ></PartyCard>
            <PartyCard
              title="Herrman & Herrman P.L.L.C"
              subTitle="Scheduling Party"
              participants={acceptedParticipants}
            ></PartyCard>
            <PartyCard
              title="The Martinez Law Firm"
              subTitle="Attending Party"
              participants={acceptedParticipants}
            ></PartyCard>
            <PartyCard
              title="Guest"
              participants={acceptedParticipants}
            ></PartyCard>
          </>
            )
          : (
          <PartyCard
            title="The Martinez Law Firm"
            subTitle="Attending Party"
            participants={acceptedParticipants}
            isPending
            onClickAccept={handleAccept}
            onClickDecline={handleDecline}
          ></PartyCard>
            )}
      </Box>
    </Box>
  );
}

export default ParticipantsSidebarOld;
