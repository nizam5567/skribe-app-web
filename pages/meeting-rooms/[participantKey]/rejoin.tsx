import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/PostEvent.module.scss';
import SettingsIcon from '../../../components/svg-components/SettingsIcon';
import LogoSkribeSmall from '../../../components/svg-components/LogoSkribeSmall';
import CheckMarkIcon from '../../../components/svg-components/CheckMarkIcon';
import TempModal from '../../../components/TempModal';

const ReJoinEvent: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [modalTitle, setModalTitle] = useState('Button Clicked');
  const [modalDescription, setModalDescription] = useState(
    'This is under construction'
  );

  const router = useRouter();
  const handelJoin = async () => {
    router.push(window.location.href.replace('rejoin', 'live'), undefined, {
      'shallow': true
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Event Room</title>
        <meta name="description" content="Event Room" />
      </Head>

      <main className={styles.main}>
        <Grid container>
          <Grid item xs={12} sm={'auto'}>
            <div className={styles['post-event-left']}>
              <div className={styles.content}>
                <div className={styles.top}>
                  <Link href="/home">
                    <a>
                      <LogoSkribeSmall />
                    </a>
                  </Link>
                </div>
                <div className={styles.bottom}>
                  <div
                    className={styles['left-bottom-icon']}
                    onClick={() => {
                      setModalTitle('Settings - clicked');
                      setModalDescription(
                        'Settings page is in under construction'
                      );
                      handleModalOpen();
                    }}
                  >
                    <SettingsIcon />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles['content-container']}>
              <div className={styles['content-container-wrapper']}>
                <Paper sx={{ 'padding': '1rem', 'marginTop': '1rem' }}>
                  <Grid container sx={{ 'alignItems': 'center' }}>
                    <Grid item xs={12} sm={8}>
                      <Typography>
                        The Event is still Going on, Do you want to rejoin it?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ 'textAlign': 'right' }}>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => {
                            handelJoin();
                          }}
                        >
                          Join
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                <div className={styles.top}>
                  <div className={styles['top-content']}>
                    <div className={styles['event-status']}>
                      <span>This event is still Going on</span>
                    </div>

                    <div className={styles['event-buy-text']}>
                      <h2>Buy Now to Get</h2>
                      <div className={styles['event-buy-feature-points']}>
                        <ul>
                          <li>
                            <CheckMarkIcon />
                            <span>High Quality Video</span>
                          </li>
                          <li>
                            <CheckMarkIcon />
                            <span>Complete AI Transcript</span>
                          </li>
                          <li>
                            <CheckMarkIcon />
                            <span>All Exhibits Presented</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.middle}>
                  <div className={styles['event-info']}>
                    <h2 className={styles.heading}>
                      Event of Rick Benjamin
                    </h2>
                    <div className={styles['matter-title-time']}>
                      <span>Matter of John Doe v. Rick Benjameen</span>
                      <span>Created on 24 Nov 2021</span>
                      <span>Happened on 03 March 2022</span>
                    </div>
                  </div>

                  <div className={styles['deposition-info']}>
                    <div className={styles.heading}>
                      Purchase a copy of the complete Deposition, AI Transcript
                      and Exhibits.
                    </div>

                    <div className={styles['deposition-summary']}>
                      <div className={styles['left-content']}>
                        <div className={styles.cell}>
                          <div className={styles.heading}>
                            Video Duration
                          </div>
                          <div className={styles['content-text']}>2h:15m</div>
                        </div>
                        <div className={`${styles.cell}`}>
                          <div className={styles.heading}>
                            Words in Transcript
                          </div>
                          <div className={styles['content-text']}>12,914</div>
                        </div>
                        <div className={styles.cell}>
                          <div className={styles.heading}>Exhibits</div>
                          <div className={styles['content-text']}>19 files</div>
                        </div>
                      </div>
                      <div className={styles['right-content']}>
                        <div className={styles.cell}>
                          <div className={styles.heading}>Price</div>
                          <div className={styles['content-text']}>$199</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Join Skribe to add this to your library and get your first month free"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setModalTitle('Buy this Event Materials - clicked');
                            setModalDescription(
                              'With this button user will buy this Event Materials'
                            );
                            handleModalOpen();
                          }}
                        >
                          Buy this Event Materials
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
      <TempModal
        openModal={openModal}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        modalTitle={modalTitle}
        modalDescription={modalDescription}
      />
    </div>
  );
};

export default ReJoinEvent;
