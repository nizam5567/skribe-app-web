import type { NextPage } from 'next';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Link, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { getAuth, signOut as fSignOut, sendPasswordResetEmail as fSendPasswordResetEmail } from 'firebase/auth';
import styles from '../../styles/JoinStep2.module.scss';
import SkribeLogo from '../../components/svg-components/SkribeLogo';
import { boundSnackbarActions } from '../../redux/reducers/snackbarReducer/snackbarAction';
import { getEventService, getGuestService } from '../../helpers/api-helper';
import { useAuthContext } from '../../contexts/AuthContext';
import { handleApiError } from '../../util/error-handlers';
import { CreateParticipantGuestWitness, CreateParticipantGuestWitnessRoleEnum, EventStatus } from '../../openapi/models';
import { boundEventsActions } from '../../redux/reducers/eventReducer/eventAction';
import { getEventInfoByEventCode } from '../../services/meetingRoom.service';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import firebaseApp from '../../lib/firebaseApp';
import { removeStorageItem } from '../../util/common';
import { TOKEN_KEY } from '../../consts/consts';

const Join: NextPage = () => {
  const { accessToken, authService, setAuthUser } = useAuthContext();
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const eventCode = (router.query.eventCode as string) || '';
  const { event } = useAppSelector((state: RootState) => state.eventReducer);
  const { role } = useAppSelector((state: RootState) => state.roomParticipantReducer);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const alert = boundSnackbarActions;

  const validationSchema = yup.object({
    'email': yup.string().required('Required').email('Invalid email'),
    'firstName': yup.string().required('Required'),
    'lastName': yup.string().required('Required'),
    // title: yup.string().required("Required"),
    'isAgreed': yup.bool().oneOf([true], 'You must select the checkbox to proceed')
  });
  const formik = useFormik({
    'initialValues': {
      'email': '',
      'firstName': '',
      'lastName': '',
      'title': '',
      'isAgreed': false
    },
    validationSchema,
    'onSubmit': async (values: any) => {
      console.log('values', JSON.stringify(values, null, 2));
      setIsSubmitting(true);

      try {
        const participant: CreateParticipantGuestWitness = {
          'email': values.email,
          'firstname': values.firstName,
          'lastname': values.lastName,
          'title': values.title,
          'eventcode': eventCode,
          'role': role.toLowerCase() === 'guest' ? 'GUEST' : 'WITNESS',
          'eventid': event.id
        };
        const participantResponse = await createParticipant(participant);
        const participantData = participantResponse.data;
        console.log('created participantData', participantData);
        setIsSubmitting(false);
        alert.success('Successfully created participant');
        if (event) {
          switch (event?.status) {
            case EventStatus.Scheduled: {
              router.push({ 'pathname': `/meeting-rooms/${participantData.participantKey}/waiting` }, undefined, { 'shallow': false });

              break;
            }
            case EventStatus.InProgress: {
            // location.href = `/meeting-rooms/${participantData.participantKey}/live`;
              router.push({ 'pathname': `/meeting-rooms/${participantData.participantKey}/live` }, undefined, { 'shallow': false });

              break;
            }
          // No default
          }
        }
      } catch (err: any) {
        console.log(err);
        setIsSubmitting(false);
      }
    }
  });

  const createParticipant = async (participant: any) => {
    if (accessToken) {
      try {
        const guestService = await getGuestService(accessToken);
        const response: any = await guestService.createParticipantGuestWitness(participant);
        if (response.status === 200 || response.status === 201) {
          alert.success('Participant created successfully');
          // router.push(``);
          return response;
        }
      } catch (error: any) {
        alert.error('Something went wrong. Please try again');
        handleApiError(error);
      }
    }
  };

  const getEventInfo = async () => {
    if (accessToken) {
      try {
        const eventData = await getEventInfoByEventCode(accessToken, eventCode);
        console.log('eventData', eventData);
        boundEventsActions.storeEvent(eventData);
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  const redirectToSignin = async () => {
    try {
      removeStorageItem(TOKEN_KEY);
      await fSignOut(auth);
      setAuthUser(null);
      router.push(`/signin?redirectUrl=/event/${event.matterid}/${event.id}`);
    } catch (error: any) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (accessToken && !event) {
      getEventInfo();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!role) {
      router.push(`/meeting-rooms/public-event?eventCode=${eventCode}`);
    }

    if (event && role === 'skribeUser') {
      redirectToSignin();
    }
  }, [role, event]);

  const handleBlur = (name: string, value: string) => {
    switch (name) {
      case 'firstName': {
        formik.setFieldValue('firstName', value.trimStart());

        break;
      }
      case 'lastName': {
        formik.setFieldValue('lastName', value.trimStart());

        break;
      }
      case 'email': {
        formik.setFieldValue('email', value.trimStart());

        break;
      }
      case 'title': {
        formik.setFieldValue('title', value.trimStart());

        break;
      }
    // No default
    }
  };

  function capitalizeFirstLetter (str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  if (!role) {
    router.push(`/meeting-rooms/public-event?eventCode=${eventCode}`);
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Join</title>
        <meta name="description" content="Join" />
      </Head>

      <main className={styles.main}>
        <Box className={styles.content}>
          <Box className={styles['circle-top1']}></Box>
          <Box className={styles['circle-top2']}></Box>

          <Box
            sx={{
              'zIndex': 2,
              'overflowY': 'auto',
              'height': '100%',
              'position': 'relative',
              'boxShadow': '0px 23px 162px rgba(0, 0, 0, 0.1)',
              'backgroundColor': '#FFF',
              'borderRadius': '5px'
            }}
          >
            <Box
              sx={{
                'borderBottom': '1px solid #D1D3D5',
                'padding': '40px 30px 15px 30px'
              }}
            >
              <Box>
                <Link href="/events">
                  <a>
                    <SkribeLogo />
                  </a>
                </Link>
              </Box>

              <Box
                sx={{
                  'padding': '20px 0 0'
                }}
              >
                <Box
                  sx={{
                    'color': '#01090F',
                    'fontSize': '1.25rem',
                    'fontWeight': '600'
                  }}
                >
                  {event?.title}
                </Box>
                <Box
                  sx={{
                    'color': '#7C8286',
                    'fontSize': '0.875rem',
                    'paddingTop': '5px'
                  }}
                >
                  {event?.mattertitle}
                </Box>
              </Box>
            </Box>

            <Box sx={{ 'padding': '15px 30px 15px 30px' }}>
              <Box sx={{ 'fontSize': '1.125rem', 'fontWeight': '400' }}>
                You are joining as&nbsp;
                <span style={{ 'fontSize': '1rem', 'fontWeight': '600' }}>The {role && capitalizeFirstLetter(role.toLowerCase())}</span>
              </Box>
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <Grid
                    container
                    sx={{ 'margin': '10px 0' }}
                    rowSpacing={2}
                    columnSpacing={{
                      'xs': 2
                      // sm: 2, md: 3
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={(event: any) => {
                          handleBlur(event?.target.name, event?.target.value);
                        }}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        sx={{
                          '& .MuiFormHelperText-root.Mui-error': {
                            'fontSize': '12px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={(event: any) => {
                          handleBlur(event?.target.name, event?.target.value);
                        }}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        sx={{
                          '& .MuiFormHelperText-root.Mui-error': {
                            'fontSize': '12px'
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={role.toLowerCase() === 'guest' ? 6 : 12}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={(event: any) => {
                          handleBlur(event?.target.name, event?.target.value);
                        }}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                          '& .MuiFormHelperText-root.Mui-error': {
                            'fontSize': '12px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {role.toLowerCase() === 'guest' && (
                        <TextField
                          fullWidth
                          id="title"
                          name="title"
                          label="Title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          onBlur={(event: any) => {
                            handleBlur(event?.target.name, event?.target.value);
                          }}
                          error={formik.touched.title && Boolean(formik.errors.title)}
                          helperText={formik.touched.title && formik.errors.title}
                          sx={{
                            '& .MuiFormHelperText-root.Mui-error': {
                              'fontSize': '12px'
                            }
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <Box sx={{ 'padding': '0 0 30px 0' }}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={formik.values.isAgreed} name="isAgreed" onChange={formik.handleChange} />} label="I clarify that I will abide by all the rules of this event." />
                      {formik.touched.isAgreed && formik.errors.isAgreed && (
                        <Box
                          sx={{
                            'fontSize': '12px',
                            'color': '#ff0007',
                            'position': 'relative',
                            'top': '-15px'
                          }}
                        >
                          {formik.errors.isAgreed}
                        </Box>
                      )}
                    </FormGroup>

                    <Button
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                      // onClick={onSubmit}
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        'background': '#02178c'
                      }}
                    >
                      Join
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>

          <Box className={styles['circle-bottom']}></Box>
        </Box>
      </main>
    </div>
  );
};

export default Join;

export function getServerSideProps (context: any) {
  // add header
  // context.res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  // context.res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  return {
    'props': {}
  };
}
