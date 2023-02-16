import { Box, Grid, IconButton, Typography } from '@mui/material';
import { NavItem, ThreeDotMenu } from '@skribe/theme';
import React, { useState } from 'react';
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ParticipantModel } from '../../../src/types/eventTypes';
import ShieldUserIcon from '../../svg-components/ShieldUserIcon';
import OutsideAlerter from '../../v2/OutsideAlerter';
import ThreeDotIcon from '../../v2/svg-components/ThreeDotIcon';
import GuestWitnessNameCard from './GuestWitnessNameCard';
import { PARTY_TYPE } from '../../../consts/eventConsts';

interface PartyCardProps {
  title: string
  subTitle?: string
  participants: any // ParticipantModel[];
  onClickAccept?: (participantId: number) => void
  onClickDecline?: (participantId: number) => void
  isPending?: boolean
  tag?: string
}

export default function PartyCard (props: PartyCardProps) {
  const { subTitle, title, participants, isPending, onClickAccept, onClickDecline, tag } = props;
  const currentParticipant = useSelector((state: any) => state?.roomsCurrentParticipantReducer.currentParticipant);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleOutsideClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  return (
    <Box border={1} borderRadius="0.25rem" borderColor="#E8EBF2" width="100%">
      <Box sx={{ 'background': '#F1F5F8', 'p': '0.75rem' }}>
        {subTitle && (
          <Typography variant="subtitle2" sx={{ 'color': 'secondary.main' }}>
            {subTitle}
          </Typography>
        )}
        <Typography variant="h4" sx={{}}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ 'p': '0.75rem', 'display': 'flex', 'flexDirection': 'column' }}>
        {participants &&
          participants.length > 0 &&
          participants.map((participant: any, index: number) => (
            <Grid container columns={12} key={participant.participantId}>
              <Grid item xs={9}>
                <Box sx={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                  <Typography variant="h5" sx={{ 'color': 'secondary.main' }}>
                    {`${participant.firstname} ${participant.lastname}`}
                    <br />
                  </Typography>
                </Box>
              </Grid>
              {(currentParticipant.partytype === PARTY_TYPE.SCHEDULING || currentParticipant.partytype === PARTY_TYPE.ATTENDING) && (tag === 'witness' || tag === 'guest') ? <GuestWitnessNameCard tag={tag} participant={participant} /> : <Grid item xs={3}></Grid>}
            </Grid>
          ))}
      </Box>
    </Box>
  );
}
