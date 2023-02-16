import { Box, Grid, IconButton, Typography } from '@mui/material';
import { NavItem, ThreeDotMenu } from '@skribe/theme';
import React from 'react';
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline
} from 'react-icons/io5';
import { ParticipantModel } from '../../../src/types/eventTypes';
import ShieldUserIcon from '../../svg-components/ShieldUserIcon';

interface PartyCardProps {
  title: string
  subTitle?: string
  participants: ParticipantModel[]
  onClickAccept?: (participantId: number) => void
  onClickDecline?: (participantId: number) => void
  isPending?: boolean
}

export default function PartyCard (props: PartyCardProps) {
  const {
    subTitle,
    title,
    participants,
    isPending,
    onClickAccept,
    onClickDecline
  } = props;

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
          participants.map((participant) => (
            <Grid container columns={14} key={participant.participantId}>
              <Grid item xs={8}>
                <Box
                  sx={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center' }}
                >
                  <Typography variant="h5" sx={{ 'color': 'secondary.main' }}>
                    {`${participant.firstName} ${participant.lastName}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center' }}
                >
                  <Typography variant="subtitle2" sx={{ 'color': '#7c8286' }}>
                    {participant.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                {isPending
                  ? (
                  <Box
                    sx={{ 'display': 'flex', 'justifyContent': 'space-between' }}
                  >
                    {onClickDecline && (
                      <IconButton
                        onClick={() => onClickDecline(participant.participantId)
                        }
                        sx={{ 'color': 'error.main', 'p': 0 }}
                      >
                        <IoCloseCircleOutline />
                      </IconButton>
                    )}
                    {onClickDecline && (
                      <IconButton
                        onClick={() => onClickDecline(participant.participantId)
                        }
                        sx={{ 'color': 'success.main', 'p': 0 }}
                      >
                        <IoCheckmarkCircleOutline />
                      </IconButton>
                    )}
                  </Box>
                    )
                  : (
                  <ThreeDotMenu
                    menuItems={[
                      <NavItem
                        icon={<ShieldUserIcon />}
                        label="Make Host"
                        sx={{ 'px': 2, 'py': 1 }}
                        key={1}
                      />
                    ]}
                  />
                    )}
              </Grid>
            </Grid>
          ))}
      </Box>
    </Box>
  );
}
