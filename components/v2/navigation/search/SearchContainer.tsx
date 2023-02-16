import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getEventService, getMatterService } from '../../../../helpers/api-helper';
import { EventResponse, MatterResponse, MattersResponse } from '../../../../openapi';
import OutsideAlerter from '../../OutsideAlerter';
import { handleApiError } from '../../../../util/error-handlers';
import { boundMattersActions } from '../../../../redux/reducers/matterReducer/matterAction';
import { useAppSelector } from '../../../../redux/store/hooks';
import { RootState } from '../../../../redux/store/store';
import { boundEventsActions } from '../../../../redux/reducers/eventReducer/eventAction';

const SearchContainer = () => {
  const { accessToken } = useAuthContext();
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { searchMatter, matters, matter } = useAppSelector((state: RootState) => state.mattersReducer);
  const { events, event } = useAppSelector((state: RootState) => state.eventReducer);
  const [isMatterLoading, setIsMatterLoading] = useState<boolean>(false);
  const [isEventLoading, setIsEventLoading] = useState<boolean>(false);
  const [filteredEvents, setFilteredEvents] = useState<any>(events);
  const [filteredMatters, setFilteredMatters] = useState<any>(matters);

  const getMatters = async () => {
    try {
      if (accessToken) {
        setIsMatterLoading(true);
        const matterService = await getMatterService(accessToken);
        const matterResult: MattersResponse = (await matterService.getMatters()).data;
        const matters: MatterResponse[] = matterResult.matters ? matterResult.matters : [];
        boundMattersActions.storeMatters(matters.reverse());
        setIsMatterLoading(false);
      }
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const getEvents = async () => {
    try {
      if (accessToken) {
        setIsEventLoading(true);
        const eventService = await getEventService(accessToken);
        const eventResult = (await eventService.getEvents()).data;
        const listOfEvents: any = eventResult?.events ? eventResult.events : [];
        boundEventsActions.storeEvents(listOfEvents);
        setIsEventLoading(false);
      }
    } catch (error: any) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (matters === undefined) {
      getMatters();
    }
    if (events === undefined) {
      getEvents();
    }
  }, [accessToken]);

  useEffect(() => {
    setFilteredEvents(events);
    setFilteredMatters(matters);
    setShowDropdown(false);
  }, [matters, events]);

  /**
   *
   */
  const filterResult = () => {
    let newFilterEvents: any = [];
    newFilterEvents = events?.filter((event: any) => {
      const eventTitle = event.title.toLowerCase();
      if (eventTitle.includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredEvents(newFilterEvents);

    let newFilterMatters: any = [];
    newFilterMatters = matters?.filter((matter: any) => {
      const matterTitle = matter.title.toLowerCase();
      if (matterTitle.includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredMatters(newFilterMatters);
  };

  useEffect(() => {
    filterResult();
  }, [searchText]);

  const [readyToShowResult, setReadyToShowResult] = useState<boolean>(false);
  const handleSearch = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchText(target.value);
    if (target.value.length >= 1) {
      setReadyToShowResult(true);
    } else {
      setReadyToShowResult(false);
      boundMattersActions.clearSearchMatter();
    }
  };

  const handleSearchFieldClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowDropdown(false);
    } else if (!clickOutside) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const [isMatterSelectedFromDropdown, setIsMatterSelectedFromDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (((matters && matters.length) || (events && events.length)) && !isMatterSelectedFromDropdown) {
      // setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [matters, events]);

  const handleMatterSelectionFromList = (value: string, matterId: number, matter: MatterResponse) => {
    boundMattersActions.storeSearchMatter(matter);
    boundMattersActions.storeMatter(matter);
    setSearchText(value);
    setShowDropdown(false);
    setIsMatterSelectedFromDropdown(true);
  };

  // filter icon
  const [showCancelFilter, setShowCancelFilter] = useState<boolean>(false);
  useEffect(() => {
    if (searchMatter) {
      setShowCancelFilter(true);
    } else {
      setShowCancelFilter(false);
    }
  }, [searchMatter]);

  const handleRemoveFilterClick = () => {
    boundMattersActions.clearSearchMatter();
    setSearchText('');
    setShowDropdown(false);
  };

  const handleEventClick = (e: React.SyntheticEvent, event: any) => {
    boundEventsActions.storeEvent(event);
    router.push(`/event/${event?.matterid}/${event?.id}`);
  };

  return (
    <Box flex={1} position="relative" sx={{ 'width': '100%' }}>
      <OutsideAlerter handleClose={handleSearchFieldClick}>
        <Box position="relative" sx={{ 'width': '100%', 'fontWeight': 'bold' }}>
          <TextField
            size="small"
            name={'search'}
            inputProps={{ 'style': { 'fontSize': '14px', 'height': '28px', 'fontWeight': searchMatter ? 'bold' : 'normal' } }}
            sx={{
              'border': '1px solid #FFF',
              'borderRadius': 1,
              'width': '100%',
              'background': '#fff'
            }}
            type="text"
            autoComplete="off"
            placeholder="Search matters and events by name"
            value={searchText}
            onChange={handleSearch}
          />
          {showCancelFilter && (
            <Box display="flex" justifyContent="flex-end" position="absolute" top={10} right={10}>
              <Typography boxShadow={2} sx={{ 'fontSize': '12px', 'lineHeight': '20px', 'fontWeight': '300', 'background': '#e6e6e6', 'padding': '2px 10px', 'borderRadius': '20px', 'cursor': 'pointer' }} onClick={handleRemoveFilterClick}>
                Remove
              </Typography>
            </Box>
          )}
        </Box>
        {showDropdown && readyToShowResult
          ? (
          <Box sx={{ 'maxHeight': '300px', 'border': '1px solid #e6e6e6', 'background': '#fff', 'borderRadius': '5px', 'overflow': 'auto', 'zIndex': 5 }} boxShadow={3} position="absolute" top={47} left={0} right={0}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{}}>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '16px', 'color': '#B5B9BD' }} p={2} pb={0}>
                Matters
              </Typography>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#B5B9BD' }} p={2} pb={0}>
                {filteredMatters && filteredMatters.length} matters found
              </Typography>
            </Box>
            {isMatterLoading && (
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#0e168c' }} pt={2} px={2}>
                Loading...
              </Typography>
            )}
            {filteredMatters &&
              filteredMatters.length !== 0 &&
              filteredMatters.map((matter: MatterResponse, index: number) => (
                  <Box
                    key={matter.id}
                    sx={{
                      'borderBottom': '1px solid #B5B9BD50',
                      'cursor': 'pointer',
                      '&:hover': {
                        'background': '#e9ecfa'
                      }
                    }}
                    py={1.5}
                    onClick={() => {
                      handleMatterSelectionFromList(matter.title, matter.id, matter);
                    }}
                  >
                    <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px' }} px={2}>
                      {matter.title}
                    </Typography>
                  </Box>
              ))}
            <Box display="flex" justifyContent="space-between" alignItems="center" pb={2} sx={{}}>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '16px', 'color': '#B5B9BD' }} p={2} pb={0}>
                Events
              </Typography>
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#B5B9BD' }} p={2} pb={0}>
                {filteredEvents && filteredEvents.length} events found
              </Typography>
            </Box>
            {isEventLoading && (
              <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px', 'color': '#0e168c' }} p={2} px={2}>
                Loading...
              </Typography>
            )}
            {filteredEvents &&
              filteredEvents.length !== 0 &&
              filteredEvents.map((event: EventResponse, index: number) => (
                  <Box
                    key={event.id}
                    sx={{
                      'borderBottom': '1px solid #B5B9BD50',
                      '&:hover': {
                        'background': '#e9ecfa'
                      }
                    }}
                    py={1.5}
                  >
                    <Typography sx={{ 'fontSize': '14px', 'fontWeight': '300', 'lineHeight': '18px', 'cursor': 'pointer' }} px={2} onClick={(e: any) => handleEventClick(e, event)}>
                      {event.title}
                    </Typography>
                  </Box>
              ))}
          </Box>
            )
          : null}
      </OutsideAlerter>
    </Box>
  );
};

export default SearchContainer;
