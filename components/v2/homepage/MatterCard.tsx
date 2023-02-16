import { Box, Button, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import OpenArrowIcon from '../svg-components/OpenArrowIcon';
import PlusIcon from '../svg-components/PlusIcon';
import { useAuthContext } from '../../../contexts/AuthContext';
import CloseArrowIcon from '../svg-components/CloseArrowIcon';
import MatterEditIcon from '../svg-components/MatterEditIcon';
import EventsOfAMatterComponent from './EventsOfAMatterComponent';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import { EventStatus, MatterResponse } from '../../../openapi';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import CompletedEventsOfAMatterComponent from './CompletedEventsOfAMatterComponent';
import ArchivedEventsOfAMatterComponent from './ArchivedEventsOfAMatterComponent';

interface IMatterCard {
  matter: any
  index?: number
}

const MatterCard = ({ matter, index }: IMatterCard) => {
  const { matterId } = useAppSelector((state: RootState) => state.mattersReducer);
  const [events, setEvents] = useState<any>(matter?.events);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleMatterCardExpand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setEvents(matter?.events);
  }, [matter]);

  useEffect(() => {
    if (index === 0) {
      setIsExpanded(true);
    }
    if (matterId === matter.id) {
      setIsExpanded(true);
    }
  }, [index]);

  const handleCreateEvent = () => {
    boundMattersActions.storeMatter({ 'id': matter?.id, 'title': matter.title, 'description': matter.description, 'events': matter.events });
    dispatch(openModal('event'));
  };

  const handleMatterUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    boundMattersActions.storeMatter({ 'id': matter?.id, 'title': matter.title, 'description': matter.description, 'events': matter.events });
    dispatch(openModal('updateMatter'));
  };

  return (
    <Fragment>
      <Box sx={{ 'border': '1px solid #E8E9EB' }} mb={2} borderRadius={2}>
        {/* matter information */}
        <Box py={2} px={3} flex={1} display="flex" flexDirection={{ 'xs': 'column', 'md': 'row' }} justifyContent="space-between" alignItems="center" zIndex={10} borderRadius={2} sx={{ 'width': '100%', 'background': '#fff', 'cursor': 'pointer', 'filter': 'drop-shadow(-4px 8px 24px rgba(44, 63, 88, 0.02))', 'boxShadow': '0px 6px 6px rgba(0, 0, 0, 0.08)' }} onClick={(e) => handleMatterCardExpand(e)}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{}}>
            <Box display="flex" flexDirection="row" alignItems="center" sx={{ 'cursor': 'pointer' }}>
              <Typography sx={{ 'color': '#02178C', 'fontSize': '18px', 'lineHeight': '22px', 'fontWeight': '400', 'marginRight': '8px', 'marginLeft': '8px' }}>{matter?.title}</Typography>
            </Box>
            <Box onClick={(e) => handleMatterUpdate(e)} sx={{ 'cursor': 'pointer' }} display="flex" justifyContent="center" alignItems="center">
              <MatterEditIcon />
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" sx={{ 'cursor': 'pointer' }}>
            {/* <Box sx={{ background: "#e6e6e6" }} mr={4} p={1} borderRadius={1}>
              <Typography sx={{ fontSize: "13px", lineHeight: "16px", fontWeight: 100 }}>Total {matter.events ? matter.events.length : 0} Events</Typography>
            </Box> */}

            {isExpanded ? <CloseArrowIcon /> : <OpenArrowIcon />}
          </Box>
        </Box>
        {/* events information */}
        <Box sx={{ 'background': '#FCFDFF', 'boxShadow': '0px 6px 6px rgba(0, 0, 0, 0.08)' }} borderRadius={2} boxShadow={2}>
          {isExpanded ? (
            <Box sx={{ 'background': '#FCFDFF' }} borderRadius={2}>
              {events && events?.length !== 0
                ? (
                <Box display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center" position="relative">
                  <Box display="flex" alignItems="center" justifyContent="flex-end" position="relative" top={40} right={16}>
                    <Button variant="outlined" size="small" startIcon={<PlusIcon />} sx={{ 'background': 'transparent', 'padding': '3px 8px 3px 3px', 'fontSize': '14px', 'lineHeight': '17px', 'fontWeight': '400', 'color': '#02178C', 'border': 'none', '&:hover': { 'border': 'none', 'background': '#fff' } }} onClick={handleCreateEvent}>
                      Create New Event
                    </Button>
                  </Box>
                </Box>
                  )
                : null}
              <Box borderRadius={2}>
                <EventsOfAMatterComponent events={events} title={EventStatus.InProgress} />
                <EventsOfAMatterComponent events={events} />
                {/* <EventsOfAMatterComponent events={events} title={EventStatus.Complete} /> */}
                <CompletedEventsOfAMatterComponent events={events} />
                <ArchivedEventsOfAMatterComponent events={events} />
                {!events || events?.length === 0
                  ? (
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
                    <Typography mb={1} sx={{ 'fontSize': '16px', 'lineHeight': '19px', 'fontWeight': '500' }}>
                      No Events
                    </Typography>
                    <Typography mb={3} sx={{ 'fontSize': '12px', 'lineHeight': '15px', 'fontWeight': '400' }}>
                      No events created under this matter yet.
                    </Typography>
                    <Button variant="contained" disableElevation sx={{ 'padding': '10px 20px', 'fontSize': '14px', 'fontWeight': '400', 'lineHeight': '17px', 'background': '#02178C' }} onClick={handleCreateEvent}>
                      Create a New Event
                    </Button>
                  </Box>
                    )
                  : (
                  <Box p={3}></Box>
                    )}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  );
};

export default MatterCard;
