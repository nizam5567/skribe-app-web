import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IS_ANONYMOUS_USER } from '../../../consts/consts';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from '../../../styles/EventRoom.module.scss';
import { getStorageItem } from '../../../util/common';
import PrivateLiveRoom from './private-live-room';
import PublicLiveRoom from './public-live-room';

const LiveEventRoom: NextPage = (props) => {
  // const { authUser } = useAuthContext();
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean | undefined>();

  // useEffect(() => {
  //   if (authUser) {
  //     console.log("authUser", authUser);
  //     if (authUser && authUser.isAnonymous === true) {
  //       setIsUserAnonymous(true);
  //     } else {
  //       setIsUserAnonymous(false);
  //     }
  //   }
  // }, [authUser]);

  useEffect(() => {
    // const isAnonymUser = getStorageItem(IS_ANONYMOUS_USER);
    const isAnonymUser = sessionStorage.getItem(IS_ANONYMOUS_USER);

    if (isAnonymUser) {
      setIsUserAnonymous(true);
    } else {
      setIsUserAnonymous(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Event Room</title>
        <meta name="description" content="Event Room" />
        {/* This is for activating gallery view for localhost */}
        {/* <meta httpEquiv="origin-trial" content="AmvDdrsuMBChW59XaaN9cu3MByFK3sh0d3jlXfdAPRyHo2GD895N4ZXfnrmpNcddS+0WiHpT9YKR4Fxg7qvZ2QcAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NzUyOTU5OTl9" /> */}
        {/* This is for activating gallery view for server */}
        <meta httpEquiv="origin-trial" content="AuVvupIoJBYgkZbOA8+WoXC+Mh4+YQ+mV5/gc6aU0S8dUSjuCZiCgQtjzB4mLl0+KlPWK6Yf8el539urpqbjeAYAAABzeyJvcmlnaW4iOiJodHRwczovL3NrcmliZS5haTo0NDMiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NzUyOTU5OTksImlzU3ViZG9tYWluIjp0cnVlfQ==" />
      </Head>
      <main className={styles.main}>
        {isUserAnonymous === false && <PrivateLiveRoom />}
        {isUserAnonymous === true && <PublicLiveRoom />}
      </main>
    </div>
  );
};

export default LiveEventRoom;

export async function getServerSideProps () {
  // add header
  // context.res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  // context.res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  return {
    'props': {
      'auth': true
    }
  };
}
