import { FormEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { getPartyService } from '../../../helpers/api-helper';
import OutsideAlerter from '../OutsideAlerter';
import { boundPartysActions } from '../../../redux/reducers/partyReducer/partyAction';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { PartyResponse, TenantResponse } from '../../../openapi';
import { boundPartiesExhibitsOfEventsReducer } from '../../../redux/reducers/partyExhibitReducer/partyExhibitAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';

const InvitePartyModal = () => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const dispatch = useDispatch();
  const { parties, connectedParties, connectedParty } = useAppSelector((state: RootState) => state?.partiesReducer);
  const { partiesByEventId } = useAppSelector((state: RootState) => state.partiesExhibitsOfEventsReducer);
  const [filteredConnectedParties, setFilteredConnectedParties] = useState<TenantResponse[] | undefined>(connectedParties);
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const matterId = router.query.matterId as string;
  const [modalTitle, setModalTitle] = useState('Invite Party Point of Contact');
  const [modalSubTitle, setModalSubTitle] = useState("This person will manage their party's registration exhibit queue");
  const [companyName, setCompnayName] = useState<string>('');
  const [tenantId, setTenantId] = useState<number | null>(null);
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [isPartyAlreadyInvited, setIsPartyAlreadyInvited] = useState<boolean>(false);
  const [isEmailAddressAlreadyExists, setIsEmailAddressAlreadyExists] = useState<boolean>(false);

  useEffect(() => {
    if (modalStatus && modalName === 'party') {
      handleModalOpen();
    } else {
      handleModalClose();
    }
    setFilteredConnectedParties(connectedParties);
    setShowPartyListDropdown(false);
    setIsPartyAlreadyInvited(false);
    setIsEmailAddressAlreadyExists(false);
    setTenantId(null);
  }, [modalStatus]);

  useEffect(() => {
    if (connectedParties) {
      setFilteredConnectedParties(connectedParties);
    }
  }, [connectedParties]);

  const initialValues = {
    'partyName': '',
    'email': '',
    'tenantId': null
  };

  const validationSchema = Yup.object({
    'partyName': Yup.string().required('Required'),
    'email': Yup.string().email('Invalid email format').required('Required')
  });

  const onSubmit = (values: any, actions: any) => {
    const userTenantIdFromLocalStorage = sessionStorage.getItem('userTenantId');
    const party: any = {
      'eventid': parseInt(eventId),
      'name': values.partyName,
      'email': values.email
    };
    if (!tenantId) {
    }
    inviteParty(party, actions);
  };
  const inviteParty = async (party: any, actions: any) => {
    if (accessToken) {
      try {
        const partyService = await getPartyService(accessToken);
        const partyResponse: any = await partyService.createParty(party);
        const formattedResponse: PartyResponse = {
          'eventid': partyResponse?.data?.eventid,
          'id': partyResponse?.data?.id,
          'name': partyResponse?.data?.name,
          'partytype': partyResponse?.data?.partytype,
          'stipulationstatus': partyResponse?.data?.stipulationstatus,
          'tenantid': partyResponse?.data?.tenantid,
          'invitationcode': '',
          'stipulationupdatedbyinfo': {},
          'stipulationupdatedat': '',
          'stipulationupdatedby': 0,
          'email': party.email
        };
        boundPartysActions.createParty(formattedResponse);
        boundPartiesExhibitsOfEventsReducer.createPartiesByEventId({ [eventId]: [formattedResponse] });
        boundMattersActions.increaseInvitedCount({ 'matterId': Number(matterId), 'eventId': Number(eventId) });
        actions.setSubmitting(false);
        dispatch(closeModal());
      } catch (error: any) {
        if (error.response.data.message === 'Email address already exists!') {
          setIsEmailAddressAlreadyExists(true);
        } else {
          alert.error(error.response.data.message);
        }
        actions.setSubmitting(false);
      }
    }
  };
  const handleFormOnChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'partyName') {
      setShowPartyListDropdown(true);
      if (!value) {
        setFilteredConnectedParties(connectedParties);
        return;
      }
      const newList =
        connectedParties &&
        connectedParties.filter((party: TenantResponse) => {
          const company = party?.company;
          if (company.toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
          return false;
        });
      setFilteredConnectedParties(newList);
    }
    if (name === 'email') {
      checkPartyIsAlreadyInvited(value);
      setIsEmailAddressAlreadyExists(false);
    }
  };

  const checkPartyIsAlreadyInvited = (value: string) => {
    if (parties) {
      let isFound = false;
      parties.map((party: PartyResponse) => {
        if (party.email === value) {
          isFound = true;
          setIsPartyAlreadyInvited(true);
        }
      });
      if (!isFound) {
        setIsPartyAlreadyInvited(false);
      }
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const [showPartyListDropdown, setShowPartyListDropdown] = useState<boolean>(false);
  const hanldeMatterNameInputClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowPartyListDropdown(false);
    } else {
      setShowPartyListDropdown(true);
    }
  };

  const handlePartySelectFromDropdown = (formik: any, party: TenantResponse) => {
    setCompnayName(party?.company);
    setTenantId(party?.id);
    formik.setFieldValue('partyName', party?.company);
    formik.setFieldValue('tenantId', party?.id);
    formik.setFieldValue('email', party?.email);
    formik.setFieldTouched('partyName', false);
    formik.setFieldTouched('email', false);
    setShowPartyListDropdown(false);
    checkPartyIsAlreadyInvited(party?.email);
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle} modalSubTitle={modalSubTitle}>
      <Box p={3} width={'100%'}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
              <Form onChange={handleFormOnChange}>
                <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start' }}>
                  <Box position="relative" sx={{ 'width': '100%', 'flex': 1 }}>
                    <OutsideAlerter handleClose={hanldeMatterNameInputClick}>
                      <TextField
                        label="Party Name"
                        size="medium"
                        name={'partyName'}
                        inputProps={{ 'style': { 'fontSize': '16px' } }}
                        sx={{
                          'border': '1px solid #FFF',
                          'borderRadius': 1,
                          'width': '100%'
                        }}
                        type="text"
                        autoComplete="off"
                        placeholder="Party Name (e.g. David and Smith PLLC...)"
                        value={formik.values.partyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.partyName && Boolean(formik.errors.partyName)}
                        helperText={formik.touched.partyName && formik.errors.partyName}
                      />
                      {showPartyListDropdown && (
                        <Box sx={{ 'border': '1px solid #e6e6e6', 'zIndex': 10, 'background': '#fff', 'maxHeight': '250px', 'overflow': 'auto' }} borderRadius={1} position="absolute" top={'58px'} left={0} right={0} boxShadow={2}>
                          {filteredConnectedParties &&
                            filteredConnectedParties.map((party: TenantResponse, index: number) => (
                                <Typography textAlign={'left'} p={2} key={index} sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '18px', 'cursor': 'pointer', 'borderBottom': '1px solid #e6e6e6' }} onClick={() => handlePartySelectFromDropdown(formik, party)}>
                                  {party.company}
                                </Typography>
                            ))}
                          {!filteredConnectedParties && (
                            <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '10vh' }}>
                              <CircularProgress size="2rem" />
                              <Typography sx={{ 'mt': 1 }}>Loading...</Typography>
                            </Stack>
                          )}
                        </Box>
                      )}
                    </OutsideAlerter>
                  </Box>
                  {!tenantId || true
                    ? (
                    <TextField
                      label="Email"
                      size="medium"
                      name={'email'}
                      inputProps={{ 'style': { 'fontSize': '16px' } }}
                      sx={{
                        'border': '1px solid #FFF',
                        'borderRadius': 1,
                        'width': '100%',
                        'mt': 2.5
                      }}
                      type="email"
                      autoComplete="off"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                      )
                    : null}
                  {isPartyAlreadyInvited && <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': 300, 'color': 'red', 'mt': 1 }}>This is party is already invited for this event.</Typography>}

                  {isEmailAddressAlreadyExists && <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': 300, 'color': 'red', 'mt': 1 }}>Email address already exists!</Typography>}

                  <Box mt={4}>
                    <Button variant="contained" size="medium" type="submit" sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />} disabled={formik.isSubmitting || isPartyAlreadyInvited}>
                      Invite
                    </Button>
                    <Button variant="outlined" size="medium" type="button" color="secondary" sx={{}} onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Box>
                  <Typography mt={2} mb={2} sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': '300', 'textAlign': 'left' }}>
                    {' '}
                    Skribe will send an email giving them access to all aspects of this event except for your exhibits.
                  </Typography>
                </Box>
              </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default InvitePartyModal;
