import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Stack } from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';

export default function PrivateRoute ({ publicRoutes, children }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authUser } = useAuthContext();
  const redirectPageUrl = router.query.redirectUrl as string;

  const pathIsPublic = publicRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      console.log(`App is changing to ${url} `);
    };

    const handleRouteComplete = (url: any) => {
      console.log(`App changed to ${url} `);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  useEffect(() => {
    if (authUser === null && !pathIsPublic) {
      router.push('/signin');
    }
  }, [authUser, pathIsPublic]);

  useEffect(() => {
    let redirectUrl = '';

    if (authUser) {
      if (router.pathname === '/signin' || router.pathname === '/signup') {
        redirectUrl = '/home';
      }

      if (authUser.isAnonymous === false && redirectPageUrl) {
        console.log('redirectPageUrl', redirectPageUrl);
        redirectUrl = redirectPageUrl;
      }

      if (authUser.reloadUserInfo && parseInt(authUser.reloadUserInfo.createdAt) === authUser.reloadUserInfo.passwordUpdatedAt) {
        redirectUrl = '/security';
      } else {
      }

      if (redirectUrl !== '') {
        router.push(redirectUrl);
      } else {
        // setIsLoading(false);
      }
    }
  }, [authUser, redirectPageUrl]);

  if (authUser === null && !pathIsPublic) {
    return (
      <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
        <CircularProgress size="20rem" />
      </Stack>
    );
  }

  if (false) {
    return (
      <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
        <CircularProgress size="20rem" />
      </Stack>
    );
  }

  return children;
}
