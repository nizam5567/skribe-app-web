import { Badge, Box, Button, IconButton, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import PartyCard from './PartyCard';
import UserIcon from '../../svg-components/UserIcon';
import { BouncingCircle } from '../BouncingCircle';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getInvitationLink } from '../../v2/common';
import { EVENT_STATUS } from '../../../consts';

interface ParticipantsSidebarProps {
  onClose: () => void
  zoomClient: any
}

function ParticipantsSidebar (props: ParticipantsSidebarProps) {
  const { onClose, zoomClient } = props;
  const [joinedParticipants, setJoinedParticipants] = useState<any>();

  const eventParticipants = useSelector((state: any) => state?.roomsEventParticipantsReducer?.participants);

  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const alert = boundSnackbarActions;

  const copyLink = () => {
    navigator.clipboard.writeText(getInvitationLink(event));
    alert.success('Link copied.');
  };

  useEffect(() => {
    if (
      eventParticipants &&
      zoomClient &&
      event &&
      event.status === EVENT_STATUS.IN_PROGRESS
    ) {
      const joinedParticipantList = zoomClient.getAttendeeslist();
      const connectedParticipants: any = {
        'SCHEDULING': [],
        'ATTENDING': [],
        'WITNESS': [],
        'GUEST': [],
        'totalParticipants': 0
      };

      let participantCount = 0;

      if (eventParticipants.SCHEDULING && eventParticipants.SCHEDULING.length) {
        eventParticipants.SCHEDULING.forEach((item: any) => {
          const participant: any = joinedParticipantList
            .find((participantData: any) => {
              const name = `${item.firstname} ${item.lastname}`;
              return name === participantData.displayName;
            });

          if (participant) {
            connectedParticipants.SCHEDULING.push(item);
          }
        });

        participantCount += connectedParticipants.SCHEDULING.length;
      }

      if (eventParticipants.ATTENDING && eventParticipants.ATTENDING.length) {
        eventParticipants.ATTENDING.forEach((item: any) => {
          const attendingObj: any = {
            'partyname': item.partyname,
            'participants': []
          };

          if (item.participants && item.participants.length) {
            item.participants.forEach((attendingParticipant: any) => {
              const participant: any = joinedParticipantList
                .find((participantData: any) => {
                  const name = `${attendingParticipant.firstname} ${attendingParticipant.lastname}`;
                  return name === participantData.displayName;
                });
              if (participant) attendingObj.participants.push(attendingParticipant);
            });
          }

          connectedParticipants.ATTENDING.push(attendingObj);
          participantCount += attendingObj.participants.length;
        });
      }

      if (eventParticipants.WITNESS && eventParticipants.WITNESS.length) {
        eventParticipants.WITNESS.forEach((item: any) => {
          const participant: any = joinedParticipantList
            .find((participantData: any) => {
              const name = `${item.firstname} ${item.lastname}`;
              return name === participantData.displayName;
            });

          if (participant) {
            connectedParticipants.WITNESS.push(item);
          }
        });

        participantCount += connectedParticipants.WITNESS.length;
      }

      if (eventParticipants.GUEST && eventParticipants.GUEST.length) {
        eventParticipants.GUEST.forEach((item: any) => {
          const participant: any = joinedParticipantList
            .find((participantData: any) => {
              const name = `${item.firstname} ${item.lastname}`;
              return name === participantData.displayName;
            });

          if (participant) {
            connectedParticipants.GUEST.push(item);
          }
        });
        participantCount += connectedParticipants.GUEST.length;
      }

      connectedParticipants.totalParticipants = participantCount;
      setJoinedParticipants(connectedParticipants);
    }
  }, [eventParticipants, event, zoomClient]);

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
        <Typography variant="h4">Participants ({joinedParticipants?.totalParticipants})</Typography>
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
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Typography variant="h4" sx={{ 'color': 'primary.dark', 'p': 0.5, 'ml': 1 }}>
              Invite Participants
            </Typography>
          </Grid>
          <Grid item>
            <Box>
              <IconButton aria-label="Copy link"
                onClick={() => { copyLink(); }}
              >
                <ContentCopyOutlinedIcon />
              </IconButton>

            </Box>
          </Grid>
        </Grid>

      </Box>
      <Box
        sx={{
          'px': '1rem',
          'py': '1.5rem',
          'display': 'flex',
          'flexDirection': 'column',
          'rowGap': '1rem',
          'height': 'calc(100vh - 130px)',
          'overflowY': 'auto'
        }}
      >
        {joinedParticipants && Object.keys(joinedParticipants).length !== 0 && <>
          {joinedParticipants.WITNESS.length > 0 && <PartyCard title="Event Witness" participants={joinedParticipants.WITNESS} tag="witness"></PartyCard>}

          {/* <PartyCard title="Scheduling Party" participants={joinedParticipants.SCHEDULING}></PartyCard> */}
          {(joinedParticipants.SCHEDULING && joinedParticipants.SCHEDULING.length > 0) &&
            <PartyCard title={joinedParticipants.SCHEDULING[0].partyname} subTitle="Scheduling Party" participants={joinedParticipants.SCHEDULING}></PartyCard>
          }
          {joinedParticipants.ATTENDING.length > 0 &&
            joinedParticipants.ATTENDING.map((item: any) => (
              <>
                {(item.participants && item.participants.length > 0) &&
                  <PartyCard title={item.partyname} subTitle="Attending Party" participants={item.participants}></PartyCard>
                }
              </>
            ))}
          {joinedParticipants.GUEST.length > 0 && <PartyCard title="Guest" participants={joinedParticipants.GUEST} tag="guest"></PartyCard>}
        </>}
      </Box>
    </Box>
  );
}

export default ParticipantsSidebar;
