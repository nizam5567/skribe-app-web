import { CircularProgress, Stack } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IS_ANONYMOUS_USER } from '../consts/consts';
import { getTenantService } from '../helpers/api-helper';
import { TenantResponse } from '../openapi';
import { boundSnackbarActions } from '../redux/reducers/snackbarReducer/snackbarAction';

interface AuthContextValues {
  signIn: Function
  signOut: Function
  signInWithNewPassword: Function
  accessToken: string | null
  authUser: any
  setAuthUser: any
  publicRoutes: string[]
  authService: any
  setAccessToken: Function
  clearAll: Function
}

export const AuthContext = React.createContext<AuthContextValues>({} as AuthContextValues);

interface AuthProviderProps {
  children: React.ReactNode
  pageProps: any
}

export const AuthProvider = ({ children, pageProps }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  const [authService, setAuthService] = useState<any>();
  const router = useRouter();
  const publicRoutes = ['/signin', '/signup', '/meeting-rooms/public-event', '/post-event', '/meeting-rooms/join', '/reset-password', '/change-password', '/verify-email', '/forgot-password'];

  const publicRoutes2 = ['/signin', '/signup', '/reset-password', '/verify-email', '/forgot-password', '/change-password'];

  const getTenantsByEmail = async (email: string): Promise<TenantResponse | undefined> => {
    try {
      const tenantService = await getTenantService();
      const tenantResponse: TenantResponse = (await tenantService.getTenantByEmail(email)).data;
      router.push('/home');
      return tenantResponse;
    } catch (error: any) {
      throw error;
    }
  };

  const getTenantInfo = async (values: any) => {
    const resData: TenantResponse | undefined = await getTenantsByEmail(values.email);
    if (resData && resData.id) {
      sessionStorage.setItem('userTenantId', resData.id.toString());
    }
  };

  const signInWithNewPassword = async (values: any) => {
    const { email, tempPassword, password } = values;
    Auth.signIn(email, tempPassword)
      .then((user) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(user, password)
            .then((user) => {
              boundSnackbarActions.success('Password changed successfully');
              getTenantInfo(values);
              setAccessToken(user.signInUserSession.accessToken.jwtToken);
              setAuthUser(user.attributes || user.challengeParam.userAttributes);
              sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
              sessionStorage.setItem('authUser', JSON.stringify(user.attributes || user.challengeParam.userAttributes));
              sessionStorage.removeItem('email');
            })
            .catch((e: any) => {
              boundSnackbarActions.error(e.message);
            });
        } else {
        }
      })
      .catch((e: any) => {
        boundSnackbarActions.error(e.message);
      });
  };

  const signIn = async (values: any) => {
    const { email } = values;
    const { password } = values;
    const user = await Auth.signIn(email, password);
    setAccessToken(user.signInUserSession.accessToken.jwtToken);
    setAuthUser(user.attributes);
    sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
    sessionStorage.setItem('authUser', JSON.stringify(user.attributes));
    sessionStorage.removeItem('email');
    if (router.query.redirectUrl) {
      const redirectPageUrl = router.query.redirectUrl as string;
      router.push(redirectPageUrl);
    } else {
      router.push('/home');
    }
  };

  const clearAll = () => {
    if (typeof window !== undefined) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('authUser');
      sessionStorage.removeItem('userTenantId');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem(IS_ANONYMOUS_USER);
    }
    setAccessToken(null);
    setAuthUser(null);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      clearAll();
      location.href = '/signin';
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') !== 'undefined') {
        setAccessToken(sessionStorage.getItem('accessToken'));
      }
    }

    if (!authUser) {
      if (sessionStorage.getItem('authUser') && sessionStorage.getItem('authUser') !== 'undefined') {
        setAuthUser(JSON.parse(sessionStorage.getItem('authUser') as string));
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (pageProps.auth && !accessToken) {
        if (sessionStorage.getItem('authUser') && sessionStorage.getItem('authUser') !== 'undefined') {
          setAuthUser(JSON.parse(sessionStorage.getItem('authUser') as string));
        }
        if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') !== 'undefined') {
          setAccessToken(sessionStorage.getItem('accessToken'));
        } else {
          clearAll();
          router.replace('/signin');
        }
      } else if (accessToken && publicRoutes2.includes(location.pathname)) {
        router.replace('/home');
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const checkAuth = () => {        
        if (sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") !== "undefined") {
          setAccessToken(sessionStorage.getItem("accessToken"));
        }
    };
    window.addEventListener("storage", checkAuth);
    return () => {
        window.removeEventListener("storage", checkAuth);
    };
}, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, accessToken, authUser, setAuthUser, publicRoutes, authService, signInWithNewPassword, setAccessToken, clearAll }}>
      {(pageProps.auth && accessToken) || !pageProps.auth
        ? (
            children
          )
        : (
        <Stack display="flex" direction="column" alignItems="center" justifyContent="center" style={{ 'minHeight': '100vh' }}>
          <CircularProgress size="2rem" />
        </Stack>
          )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
