import { IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import DownloadIcon from '../svg-components/DownloadIcon';
import StipulationPDFIcon from '../svg-components/StipulationPDFIcon';
import SingleDotIcon from '../svg-components/SingleDotIcon';
import AttendingListModal from './AttendeeListModal';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getEventParticipantsByEventId } from '../../../services/meetingRoom.service';
import { saveRoomsEventParticipants } from '../../../redux/reducers/roomsEventParticipantsReducer/roomsEventParticipantsAction';
import { getEventService } from '../../../helpers/api-helper';
import { handleApiError } from '../../../util/error-handlers';

interface IWrittenRecord {
  transcriptPdfUrl: string
}

const WrittenRecord = ({ transcriptPdfUrl }: IWrittenRecord) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const eventId: string = router.query.eventId as string;
  const { participants } = useAppSelector((state: RootState) => state.roomsEventParticipantsReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [participantList, setParticipantList] = useState<any>([]);
  const [eventParticipants, setEventParticipants] = useState<any>();
  const handleModal = () => setIsOpen(!isOpen);

  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const { publicExhibits } = useAppSelector((state: RootState) => state.exhibitReducer);

  const getXmlData = async (xmlFileUrl: string) => {
    const XMLParser = await require('react-xml-parser');
    fetch(xmlFileUrl)
      .then(async (res) => {
        const text = await res.text();
        const xml = new XMLParser().parseFromString(text);

        let participantList = _.get(xml, 'children[0].children').filter((item: any) => item.name === 'ptps');

        participantList = participantList.map((itm: any) => ({
          'participantId': _.get(itm, 'children[0].attributes.id'),
          'name': _.get(_.head(_.get(itm, 'children[0].children').filter((i: any) => i.name === 'name')), 'value')
        }));
        setParticipantList(participantList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getParticipantList = async (eventId: number) => {
    if (accessToken) {
      try {
        if (Number(eventId) > 0) {
          const eventService = await getEventService(accessToken);
          const response: any = await eventService.getPosteventVideo(eventId);
          if (response.data.transcriptUrl) {
            getXmlData(response.data.transcriptUrl);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getEventParticipants = async (eventId: number) => {
    if (accessToken) {
      try {
        const participantsData: any = await getEventParticipantsByEventId(accessToken, eventId);

        // dispatch(saveRoomsEventParticipants({ participants: participantsData }));
        setEventParticipants(participantsData);
      } catch (error: any) {
        handleApiError(error);
      } finally {
      }
    }
  };

  const filterParticipants = () => {
    const users: any = [];
    participantList.map((participant: any) => {
      users.push(participant.name);
    });

    const actualEventPartyUsers: any = {
      'SCHEDULING': [],
      'ATTENDING': [],
      'GUEST': [],
      'WITNESS': []
    };
    eventParticipants.SCHEDULING.map((participant: any) => {
      const name = `${participant.firstname} ${participant.lastname}`.toLowerCase();
      users.map((user: any) => {
        const userName: string = user.toLowerCase();
        if (userName.includes(name) || name.includes(userName)) {
          actualEventPartyUsers.SCHEDULING.push(participant);
        }
      });
    });
    eventParticipants.WITNESS.map((participant: any) => {
      const name = `${participant.firstname} ${participant.lastname}`.toLowerCase();
      users.map((user: any) => {
        const userName: string = user.toLowerCase();
        if (userName.includes(name) || name.includes(userName)) {
          actualEventPartyUsers.WITNESS.push(participant);
        }
      });
    });
    eventParticipants.GUEST.map((participant: any) => {
      const name = `${participant.firstname} ${participant.lastname}`.toLowerCase();
      users.map((user: any) => {
        const userName: string = user.toLowerCase();
        if (userName.includes(name) || name.includes(userName)) {
          actualEventPartyUsers.GUEST.push(participant);
        }
      });
    });

    eventParticipants.ATTENDING.map((party: any, index: number) => {
      const { partyname } = party;
      const participants: any = [];
      party.participants.map((participant: any) => {
        const name: string = `${participant.firstname} ${participant.lastname}`.toLowerCase();
        users.map((user: any) => {
          const userName: string = user.toLowerCase();
          if (userName.includes(name) || name.includes(userName)) {
            return participants.push(participant);
          }
        });
      });
      if (participants.length) {
        actualEventPartyUsers.ATTENDING.push({ participants, partyname });
      }
    });

    dispatch(saveRoomsEventParticipants({ 'participants': actualEventPartyUsers }));

    // eventParticipants.forEach((participant: any) => {
    //   let name = `${participant.firstname} ${participant.lastname}`;
    //   let filteredAudioUser = Object.values(users).filter((item: any) => name.includes(item.name));
    //   if (filteredAudioUser.length > 0) actualPartyUsers.push(user);
    // });
  };

  useEffect(() => {
    if (eventParticipants && participantList) {
      filterParticipants();
    }
  }, [eventParticipants, participantList]);

  useEffect(() => {
    if (eventId && Number(eventId)) {
      getParticipantList(Number(eventId));
      getEventParticipants(Number(eventId));
    }
  }, [eventId]);

  const downloadFile = async (url: string, fileName: string) => {
    const streamSaver: any = await require('streamsaver');
    await fetch(url)
      .then((res: any) => {
        const fileStream = streamSaver.createWriteStream(fileName);
        const writer = fileStream.getWriter();
        if (res.body.pipeTo) {
          writer.releaseLock();
          return res.body.pipeTo(fileStream);
        }

        const reader = res.body.getReader();
        const pump = () => reader.read().then((result: any) => (result.done ? writer.close() : writer.write(result.value).then(pump)));

        return pump();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllExhibits = () => {
    if (publicExhibits && publicExhibits?.length > 0) {
      for (let i = 0; i < publicExhibits.length; i++) {
        downloadFile(publicExhibits[i].previewlink, publicExhibits[i].title);
        // window.open(publicExhibits[i].previewlink);
      }
    }
  };

  const handleStipulationDownload = () => {
    // window.open(event.previewlink);
    if (event?.previewlink) {
      downloadFile(event.previewlink, `${event.title.replaceAll(' ', '-')}-${event.id}.pdf`);
    }
  };

  const handleTranscriptPdfDownload = () => {
    // if (transcriptPdfUrl) fileDownload(transcriptPdfUrl, `${event.title.replaceAll(" ", "-")}-${event.id}.pdf`)
    // if (transcriptPdfUrl) window.open(transcriptPdfUrl);
    downloadFile(transcriptPdfUrl, `${event.title} Rough AI Transcript.pdf`);
  };

  const handleFullWrittenDownload = () => {
    handleStipulationDownload();
    handleAllExhibits();
    handleTranscriptPdfDownload();
  };

  return (
    <>
      {isOpen && <AttendingListModal isOpen={isOpen} handleModal={handleModal} />}

      <List dense>
        {/* FULL WRITTEN RECORD */}
        {(event?.previewlink || (publicExhibits && publicExhibits?.length > 0)) && (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{
                  'borderRadius': '5px',
                  '&:hover': {
                    'borderRadius': '5px'
                  }
                }}
                onClick={handleFullWrittenDownload}
              >
                <DownloadIcon />
                <Typography pl="5px" sx={{ 'fontSize': '12px' }}>
                  {' '}
                  Download
                </Typography>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <StipulationPDFIcon />
            </ListItemAvatar>
            <ListItemText primary="Full Written Record" secondary="" />
          </ListItem>
        )}

        {/* STIPULATIONS */}
        {event?.previewlink && (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{
                  'borderRadius': '5px',
                  '&:hover': {
                    'borderRadius': '5px'
                  }
                }}
                onClick={handleStipulationDownload}
              >
                <DownloadIcon />
                <Typography pl="5px" sx={{ 'fontSize': '12px' }}>
                  {' '}
                  Download
                </Typography>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <SingleDotIcon />
            </ListItemAvatar>
            <ListItemText primary="Stipulations" secondary="" />
          </ListItem>
        )}

        {/* ATTENDING LIST */}
        {/* <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleModal}
              sx={{
                borderRadius: "5px",
                "&:hover": {
                  borderRadius: "5px",
                },
              }}
            >
              <Typography pl="5px" sx={{ fontSize: "12px" }}>
                {" "}
                View
              </Typography>
            </IconButton>
          }
        >
          <ListItemAvatar>
            <SingleDotIcon />
          </ListItemAvatar>
          <ListItemText primary="Attendee List" secondary="" />
        </ListItem> */}

        {/* AI Transcript */}
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleTranscriptPdfDownload}
              sx={{
                'borderRadius': '5px',
                '&:hover': {
                  'borderRadius': '5px'
                }
              }}
            >
              <DownloadIcon />
              <Typography pl="5px" sx={{ 'fontSize': '12px' }}>
                {transcriptPdfUrl ? ' Download' : ' IN PROGRESS'}
              </Typography>
            </IconButton>
          }
        >
          <ListItemAvatar>
            <SingleDotIcon />
          </ListItemAvatar>
          <ListItemText primary="Rough AI Transcript" secondary="" />
        </ListItem>

        {/* ALL EXHIBITS */}
        {publicExhibits && publicExhibits.length > 0 && (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{
                  'borderRadius': '5px',
                  '&:hover': {
                    'borderRadius': '5px'
                  }
                }}
                onClick={handleAllExhibits}
              >
                <DownloadIcon />
                <Typography
                  pl="5px"
                  sx={{
                    'fontSize': '12px'
                  }}
                >
                  {' '}
                  Download
                </Typography>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <SingleDotIcon />
            </ListItemAvatar>
            <ListItemText primary="All Exhibits" secondary="" />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default WrittenRecord;
