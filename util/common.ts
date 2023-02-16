import { getAuth } from 'firebase/auth';
import jwt from 'jsonwebtoken';
import firebaseApp from '../lib/firebaseApp';
import { AUTH_USER_DETAILS, TOKEN_KEY } from '../consts/consts';

const auth = getAuth(firebaseApp);

export interface AuthUserDetails {
  userId: string
  email: string
  name: string
}

interface DecodedToken {
  header: {
    alg: string
    typ: string
  }
  payload: {
    aud: string
    iat: number
    exp: number
    iss: string
    sub: string
    uid: string
    tenant_id: string
    claims: {
      role: string
      tenant: string
    }
  }
  signature: string
}

export const getStorageItem = (storageKey: string) => {
  try {
    const storageValue = sessionStorage.getItem(storageKey);
    return storageValue ? JSON.parse(storageValue) : null;
  } catch (error: any) {
    console.log(error, 'not found local storage');
  }
};

export const setStorageItem = (storageValue: any, storageKey: string) => {
  sessionStorage.setItem(storageKey, JSON.stringify(storageValue));
};

export const removeStorageItem = (storageKey: string) => {
  sessionStorage.removeItem(storageKey);
};

export const isTokenExpired = (token: string) => {
  const dateNow = new Date();
  const decodedTokenData = jwt.decode(token, { 'complete': true }) as DecodedToken;
  if (decodedTokenData &&
    decodedTokenData.payload &&
    decodedTokenData.payload.exp < Math.floor(dateNow.getTime() / 1000)) {
    return true;
  }

  return false;
};

export const setNewToken = async () => {
  const user = auth.currentUser;
  console.log('auth user', auth);
  if (user) {
    const token = await user.getIdToken(true);
    setStorageItem(token, TOKEN_KEY);
  }
};

export const isTokenRefreshed = async (currentToken: string | null) => {
  const token = getStorageItem(TOKEN_KEY);

  // check token is expired or not, if not get the new token
  if (token && isTokenExpired(token)) {
    await setNewToken();
    return true;
  }

  if (currentToken === null || token !== currentToken) {
    return true;
  }

  return false;
};

export const getNewToken = async (currentToken: string | null) => {
  let newToken = '';

  // check token is expired or not, if not get the new token
  if (currentToken && isTokenExpired(currentToken)) {
    const user = auth.currentUser;
    console.log('auth user getNewToken ', auth);
    if (user) {
      newToken = await user.getIdToken(true);
    }
  }

  return newToken;
};

export const setAuthUserDetails = async (authUser: any) => {
  const authUserData: AuthUserDetails = {
    'userId': authUser.uid,
    'email': authUser.email,
    'name': authUser.displayName
  };
  setStorageItem(authUserData, AUTH_USER_DETAILS);
};

export const getAuthUserDetails = () => {
  const authUserData: AuthUserDetails = getStorageItem(AUTH_USER_DETAILS);
  return authUserData;
};
