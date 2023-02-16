import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

interface PrivateRouterNewProps {
  children: React.ReactNode
}

export const PrivateRouteNew = ({ children }: PrivateRouterNewProps) => {
  const { authUser, accessToken, signOut, publicRoutes, setAccessToken, setAuthUser } = useAuthContext();

  useEffect(() => {
    if (!publicRoutes.includes(location.pathname) && !accessToken) {
      if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') !== 'undefined') {
        setAccessToken(sessionStorage.getItem('accessToken'));
        if (sessionStorage.getItem('authUser') && sessionStorage.getItem('authUser') !== 'undefined') {
          setAuthUser(JSON.parse(sessionStorage.getItem('authUser') as string));
        }
      } else {
        signOut();
      }
    }
  });

  return <>{children}</>;
};
