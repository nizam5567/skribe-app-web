import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IS_ANONYMOUS_USER } from '../../../consts/consts';
import { useAuthContext } from '../../../contexts/AuthContext';
import styles from '../../../styles/EventRoom.module.scss';
import { getStorageItem } from '../../../util/common';
import PrivateWaiting from './private-waiting';
import PublicWaiting from './public-waiting';

const Waiting: NextPage = (props) => {
  const { accessToken } = useAuthContext();
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
        <title>Waiting Room</title>
        <meta name="description" content="waiting room" />
      </Head>
      <main className={styles.main}>
        {isUserAnonymous === false && <PrivateWaiting />}
        {isUserAnonymous === true && <PublicWaiting />}
      </main>
    </div>
  );
};

export default Waiting;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
