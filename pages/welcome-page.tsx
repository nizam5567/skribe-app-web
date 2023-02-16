import { Box, Button, Typography, Link } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/WelcomePage.module.scss';

const WelcomePage: NextPage = () => (
    <div className={styles.container}>
      <Head>
        <title>Welcome page</title>
        <meta name="description" content="Welcome page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles['welcome-left']}>
          <div className={styles.logo}>
            <Link href="/home">
              <a>
                <Image src="/images/logo.png" alt="Skribe Logo" width={93} height={31} />
              </a>
            </Link>
          </div>
          <h1 className={styles.heading}>
            Where Testimony <br />
            Comes Alive
          </h1>
          <p className={styles['short-details']}>Skribe.ai empowers legal professionals to efficiently capture, analyze, and share legal testimony.</p>

          <div className={styles.banner}>
            <Image src="/images/banner.png" alt="Banner" width={730} height={456} />
          </div>
        </div>
        <div className={styles['welcome-right']}>
          <Box sx={{ 'margin': '0 130px' }}>
            <h1 className={`${styles['text-center']} ${styles['welcome-form-heading']}`}>Check your email for temporary password.</h1>
            <Box
              sx={{
                'color': '#01090F',
                'maxWidth': '500px'
              }}
            >
              <Typography>
                {`If you don't find the email, check spam first
                                then get `}
                <Link href="mailto:support@skribe.ai" style={{ 'color': '#4285F4', 'textDecoration': 'none' }}>
                  <a>help</a>
                </Link>
                .
              </Typography>
            </Box>
            <Box
              sx={{
                'paddingTop': '20px'
              }}
            >
              <Link href="/signin" style={{ 'textDecoration': 'none' }}>
                <Button variant="contained" size="large">
                  Proceed to Sign In
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
      </main>
    </div>
);

export default WelcomePage;
