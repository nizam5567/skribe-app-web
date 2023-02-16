import { TextField, Box, Button, Typography, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal from '../Modal';
import { closeModal } from '../../../redux/reducers/modalReducer/modalAction';
import { createMatter } from '../../../services/matter.service';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import { boundMattersActions } from '../../../redux/reducers/matterReducer/matterAction';
import CreateMatterModalBodyStep2 from './CreateMatterModalBodyStep2';
import { handleApiError } from '../../../util/error-handlers';
import OutsideAlerter from '../OutsideAlerter';
import { CreateMatterRequest, MatterResponse } from '../../../openapi';

interface ICreateMatterComponent {
  matterList: any[]
}

const CreateMatterComponent = ({ matterList }: ICreateMatterComponent) => {
  const modalStatus = useSelector((state: any) => state?.modalReducer?.modalStatus);
  const modalName = useSelector((state: any) => state?.modalReducer?.modalName);
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const alert = boundSnackbarActions;

  const [matterAlreadyExists, setMatterAlreadyExists] = useState(false);
  const [existingMatterName, setExistingMatterName] = useState('');
  const [isMatterCreatedSuccessfully, setIsMatterCreatedSuccessfully] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create new matter');
  const [openModalCommon, setOpenModalCommon] = useState(false);
  const handleModalOpen = () => setOpenModalCommon(true);
  const handleModalClose = () => setOpenModalCommon(false);
  const [showMatterListDropdown, setShowMatterListDropdown] = useState(false);
  const [filteredMatterList, setFilteredMatterList] = useState(matterList);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    if (modalStatus && modalName === 'matter') {
      handleModalOpen();
    } else {
      handleModalClose();
      resetState();
    }
    setShowMatterListDropdown(false);
    setFilteredMatterList(matterList);
  }, [modalStatus]);

  const hanldeMatterNameInputClick = (clickOutside: boolean) => {
    if (clickOutside) {
      setShowMatterListDropdown(false);
    } else {
      setShowMatterListDropdown(true);
    }
  };
  const handleMatterSelectFromDropdown: any = (formik: any, matter: any) => {
    setShowMatterListDropdown(false);
    formik.setFieldValue('matterName', matter.title);
    formik.setFieldTouched('matterName', false);
    boundMattersActions.storeMatter({ 'id': matter?.id, 'title': matter.title, 'description': matter?.description || '', 'events': matter?.events || undefined });
    setModalTitle('Now, Create a New Event');
    setIsMatterCreatedSuccessfully(true);
  };

  const initialValues = {
    'matterName': ''
  };

  const validationSchema = Yup.object({
    'matterName': Yup.string().trim().min(3, 'Matter name length should be at least 3 characters long').max(250, 'Matter name length must be shorter than or equal to 250 characters')
      .required('Required')
  });

  const onSubmit = (values: any, actions: any) => {
    const title: string = values.matterName.trim();
    createNewMatter({ title, 'description': '' }, actions);
  };

  const createNewMatter = async (matter: CreateMatterRequest, actions: any) => {
    if (accessToken) {
      try {
        const data: any = await createMatter(accessToken, matter);
        if (data?.id) {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setModalTitle('Now, Create a New Event');
            setIsMatterCreatedSuccessfully(true);
            boundMattersActions.createMatter({ 'id': data?.id, 'title': matter.title, 'description': data?.description || '', 'events': data?.events || undefined });
            boundMattersActions.storeMatter({ 'id': data?.id, 'title': matter.title, 'description': data?.description || '', 'events': data?.events || undefined });
            actions.setSubmitting(false);
            setShowSuccessMessage(false);
          }, 1500);
        }
      } catch (error: any) {
        const statusCode = error?.response?.status;
        if (statusCode === 409) {
          setMatterAlreadyExists(true);
          setExistingMatterName(matter.title);
          alert.error('Matter already exists');
          actions.setSubmitting(false);
        }
        actions.setSubmitting(false);
        handleApiError(error);
      }
    }
  };

  const handleFormOnChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    if (name === 'matterName') {
      if (existingMatterName.toLowerCase() === value.toLowerCase() && value) {
        setMatterAlreadyExists(true);
      } else {
        setMatterAlreadyExists(false);
      }
      const newList = matterList.filter((matter: any) => {
        const title = matter?.title;
        if (title.toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
        return false;
      });
      setFilteredMatterList(newList);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
    resetState();
  };

  const resetState = () => {
    setMatterAlreadyExists(false);
    setExistingMatterName('');
    setModalTitle('Create new matter');
    setIsMatterCreatedSuccessfully(false);
  };

  return (
    <Modal openModal={openModalCommon} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalTitle={modalTitle}>
      {showSuccessMessage
        ? (
        <Box p={3} display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ 'width': '100%' }}>
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 48 48" aria-hidden="true">
              <circle className="circle" fill="#5bb543" cx="24" cy="24" r="18" />
              <path className="tick" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17" />
            </svg>
          </div>
          <Typography sx={{ 'fontSize': '16px', 'lineHeight': '20px', 'fontWeight': 400 }} mt={1}>
            Now, Let&apos;s create an event
          </Typography>
        </Box>
          )
        : !isMatterCreatedSuccessfully
            ? (
        <Box p={3} width={'100%'}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form onChange={handleFormOnChange}>
                  <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'flex-start' }}>
                    <Box position="relative" sx={{ 'width': '100%', 'flex': 1 }}>
                      <OutsideAlerter handleClose={hanldeMatterNameInputClick}>
                        <TextField
                          label="Matter Name"
                          size="medium"
                          name={'matterName'}
                          inputProps={{ 'style': { 'fontSize': '16px' } }}
                          sx={{
                            'border': '1px solid #FFF',
                            'borderRadius': 1,
                            'width': '100%'
                          }}
                          type="text"
                          autoComplete="off"
                          placeholder="John Doe v. Rick Benjameen"
                          value={formik.values.matterName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.matterName && Boolean(formik.errors.matterName)) || matterAlreadyExists}
                          helperText={formik.touched.matterName && formik.errors.matterName}
                        />
                        {showMatterListDropdown && (
                          <Box sx={{ 'border': '1px solid #e6e6e6', 'zIndex': 10, 'background': '#fff', 'maxHeight': '100px', 'overflow': 'auto' }} borderRadius={1} position="absolute" top={'58px'} left={0} right={0} boxShadow={2}>
                            {filteredMatterList.map((matter: any) => (
                                <Typography textAlign={'left'} p={2} key={matter?.id} sx={{ 'fontSize': '16px', 'fontWeight': 400, 'lineHeight': '18px', 'cursor': 'pointer', 'borderBottom': '1px solid #e6e6e6' }} onClick={() => handleMatterSelectFromDropdown(formik, matter)}>
                                  {matter.title}
                                </Typography>
                            ))}
                          </Box>
                        )}
                      </OutsideAlerter>
                    </Box>
                    {matterAlreadyExists && (
                      <Typography
                        sx={{
                          'fontSize': '12px',
                          'lineHeight': '16px',
                          'fontWeight': 300,
                          'display': 'inline-block',
                          'textAlign': 'left',
                          'marginTop': 1,
                          'p': 0,
                          'color': '#ff0007'
                        }}
                      >
                        The Matter &apos;{formik.values.matterName}&apos; already exists.
                      </Typography>
                    )}
                    <Box mt={6}>
                      <Button variant="contained" size="medium" type="submit" disabled={!formik.isValid || matterAlreadyExists || formik.isSubmitting} sx={{ 'marginRight': '16px', 'background': '#02178c' }} startIcon={formik.isSubmitting && <CircularProgress size="1rem" color="inherit" />}>
                        Create New
                      </Button>
                      <Button variant="outlined" size="medium" type="button" color="secondary" sx={{}} onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Form>
            )}
          </Formik>
        </Box>
              )
            : (
        <CreateMatterModalBodyStep2 />
              )}
    </Modal>
  );
};

export default CreateMatterComponent;
