import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../../contexts/AuthContext';
import { saveRoomsEventParticipants } from '../../../redux/reducers/roomsEventParticipantsReducer/roomsEventParticipantsAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getEventParticipantsByEventId } from '../../../services/meetingRoom.service';
import { handleApiError } from '../../../util/error-handlers';
import Modal from '../Modal';

const PartyType = ({ text }: any) => <Typography sx={{ 'fontSize': '16px', 'fontWeight': 500, 'lineHeight': '25px', 'color': '#01090F', 'whiteSpace': 'nowrap', 'width': '100%', 'textTransform': 'uppercase', 'mt': '25px', 'mb': '12px' }}>{text}</Typography>;

const PartyName = ({ text }: any) => <Typography sx={{ 'fontSize': '15px', 'fontWeight': 400, 'lineHeight': '24px', 'color': '#3F434A', 'whiteSpace': 'nowrap' }}>Party Name: {text}</Typography>;

interface IParticipant {
  id: number
  firstname: string
  lastname: string
  email: string
}

const AttendingItem = ({ id, firstname, lastname, email }: IParticipant) => (
    <Box key={id} display="flex" mb={2} flexDirection="column" sx={{ 'ml': '24px' }}>
      <Typography sx={{ 'fontSize': '14px', 'fontWeight': 500, 'lineHeight': '26px', 'color': '#393939', 'whiteSpace': 'nowrap' }}>{`${firstname} ${lastname}`}</Typography>
      <Typography sx={{ 'fontSize': '14px', 'fontWeight': 400, 'lineHeight': '21px', 'color': '#3F434A', 'whiteSpace': 'nowrap' }}>Email: {email}</Typography>
    </Box>
);

interface AttendingModal {
  isOpen: boolean
  handleModal: any
}

const AttendingListModal = ({ isOpen, handleModal }: AttendingModal) => {
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();

  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const { participants } = useAppSelector((state: RootState) => state.roomsEventParticipantsReducer);

  const [modalTitle] = useState('Attending List');
  const [modalSubTitle] = useState('');

  const [loading, setLoading] = useState<boolean>(true);

  // const getEventParticipants = async () => {
  //   setLoading(true);
  //   try {
  //     const participantsData = await getEventParticipantsByEventId(accessToken, event.id);
  //     dispatch(saveRoomsEventParticipants({ participants: participantsData }));
  //   } catch (error: any) {
  //     handleApiError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(participants);
    if (participants) {
      setLoading(false);
    }
    // getEventParticipants();
  }, [participants]);

  return (
    <Modal openModal={isOpen} handleModalOpen={handleModal} handleModalClose={handleModal} modalTitle={modalTitle} modalSubTitle={modalSubTitle}>
      {loading ? (
        <Box height={300} alignSelf={'center'} display="flex" alignItems="center">
          <CircularProgress size="2rem" />
        </Box>
      ) : (
        participants && (
          <Box px={1} pb={2}>
            {/* WITNESS PARTICIPANTS */}
            {participants.WITNESS && participants.WITNESS.length
              ? (
              <Box ml={2} sx={{ 'width': '100%', 'textAlign': 'start' }}>
                <PartyType text="WITNESS" />
                {participants.WITNESS.map((item: any) => (
                  <AttendingItem key={item.id} id={item.id} firstname={item.firstname} lastname={item.lastname} email={item.email} />
                ))}
              </Box>
                )
              : null}

            {/* SCHEDULING PARTY */}
            {participants.SCHEDULING && participants.SCHEDULING.length
              ? (
              <Box ml={2} sx={{ 'width': '100%', 'textAlign': 'start' }}>
                <PartyType text={`with the party of ${participants.SCHEDULING[0].partyname}`} />
                {participants.SCHEDULING.map((item: any) => (
                  <AttendingItem key={item.id} id={item.id} firstname={item.firstname} lastname={item.lastname} email={item.email} />
                ))}
              </Box>
                )
              : null}

            {/* ATTENDING PARTY */}
            {participants.ATTENDING && participants.ATTENDING.length
              ? participants.ATTENDING.map((party: any, index: number) => (
                    <Box ml={2} sx={{ 'width': '100%', 'textAlign': 'start' }} key={index}>
                      <PartyType text={`with the party of ${party.partyname}`} />
                      <Box>
                        {party.participants.map((item: any) => (
                          <AttendingItem key={item.id} id={item.id} firstname={item.firstname} lastname={item.lastname} email={item.email} />
                        ))}
                      </Box>
                    </Box>
              ))
              : null}

            {/* GUEST PARTICIPANTS */}
            {participants.GUEST && participants.GUEST.length
              ? (
              <Box ml={2} sx={{ 'width': '100%', 'textAlign': 'start' }}>
                <PartyType text="Guests" />
                {participants.GUEST.map((item: any) => (
                  <AttendingItem key={item.id} id={item.id} firstname={item.firstname} lastname={item.lastname} email={item.email} />
                ))}
              </Box>
                )
              : null}
          </Box>
        )
      )}
    </Modal>
  );
};
export default AttendingListModal;
