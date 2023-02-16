import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fSignOut,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  confirmPasswordReset as fConfirmPasswordReset,
  signInWithCustomToken,
  signInAnonymously
} from 'firebase/auth';
import { BehaviorSubject, distinctUntilChanged, first, Observable } from 'rxjs';
import { authState } from 'rxfire/auth';
import firebaseApp from '../lib/firebaseApp';
import { setErrorMessage } from '../lib/setErrorMessage';
import { getStorageItem, removeStorageItem, setStorageItem } from '../util/common';
import { TOKEN_KEY } from '../consts/consts';
import { handleApiError } from '../util/error-handlers';
/**
 * UNKNOWN - Firebase hasn't initialized yet
 * AUTHENTICATING - User has triggered the login process
 * AUTHENTICATED - Means the authentication process is complete, the user has a custom token and user data retrieved
 * UNAUTHENTICATED - User is not authenticated
 */
export enum AuthState {
  UNKNOWN,
  AUTHENTICATING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export enum LastAction {
  NONE,
  LOGIN,
  LOGOUT,
}

export class UserAuthService {
  private auth: any;
  /**
   * After a user has authenticated, their user data is stored here
   */
  private readonly _user = new BehaviorSubject<any | null>(null);
  private readonly _state = new BehaviorSubject<AuthState>(AuthState.UNKNOWN);
  private readonly _authToken = new BehaviorSubject<any | null>(null);
  private readonly _isCheckedAuthUser = new BehaviorSubject<boolean>(false);
  private readonly _userTenantId = new BehaviorSubject<string | null>(null);
  private _idToken: string = '';

  constructor () {
    this.auth = getAuth(firebaseApp);

    authState(this.auth).pipe(distinctUntilChanged())
      .subscribe(async (u: any | null) => {
        /**
         * If u is undefined, auth status hasn't been checked yet
         */
        // console.log("user result from authState subscribe ", u);
        if (typeof u === 'undefined') {
          this._state.next(AuthState.UNKNOWN);
          /**
           * If u is null it means the user is unauthenticated
           */
        } else if (u === null) {
          this._isCheckedAuthUser.next(true);
          this._user.next(null);
        } else {
          try {
            const result = await this.auth.currentUser.getIdTokenResult();
            const currentUser = await this.auth.currentUser;
            this._user.next(currentUser);
            this._idToken = result.token;
            this._authToken.next(this._idToken);
            setStorageItem(this._idToken, TOKEN_KEY);
            this._state.next(AuthState.AUTHENTICATED);
          } catch (e: any) {
            console.error('Error retrieving ID token info', e);
            this.signOut();
            handleApiError(e);
          }
          this._isCheckedAuthUser.next(true);
        }
      });
  }

  state$ = (): Observable<AuthState> => this._state.asObservable();

  authToken$ (): Observable<any> {
    return this._authToken.asObservable();
  }

  user$ (): Observable<any> {
    return this._user.asObservable();
  }

  isCheckedAuthUser$ (): Observable<any> {
    return this._isCheckedAuthUser.asObservable();
  }

  userTenantId$ (): Observable<any> {
    return this._userTenantId.asObservable();
  }

  public signInAnonymous = async (): Promise<void> => {
    this._state.next(AuthState.AUTHENTICATING);
    this.auth = getAuth();

    console.log('res333', this.auth);
    this.auth.tenantId = 'joe-blow-company-4urk3';
    return await new Promise((resolve: any, reject: any) => {
      signInAnonymously(this.auth)
        .then((res: any) => {
          console.log('res222', res);
          if (res && res.user && res.user.accessToken) {
            removeStorageItem(TOKEN_KEY);
            setStorageItem(res.user.accessToken, TOKEN_KEY);

            this._idToken = res.user.accessToken;
            this._authToken.next(this._idToken);
          }

          this._state.next(AuthState.AUTHENTICATED);
          resolve();
        })
        .catch((error: any) => {
          let reason = 'generic';
          if (error && error.code) {
            const { title, description } = setErrorMessage(error);
            reason = `${title}: ${description}`;
          }
          this._state.next(AuthState.UNAUTHENTICATED);
          console.log('error jjj', error);
          reject(reason);
        });
    });
  };

  public signIn = async (
    email: string,
    password: string,
    tenantId: string
  ): Promise<void> => {
    this._state.next(AuthState.AUTHENTICATING);
    // console.log(tenantId);
    this.auth.tenantId = tenantId;

    return await new Promise((resolve: any, reject: any) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((res: any) => {
          removeStorageItem(TOKEN_KEY);
          setStorageItem(res._tokenResponse.idToken, TOKEN_KEY);
          this._idToken = res._tokenResponse.idToken;
          this._authToken.next(this._idToken);
          this._state.next(AuthState.AUTHENTICATED);
          resolve();
        })
        .catch((error: any) => {
          let reason = 'generic';

          // if (error && error.code) {
          //     if (error.code === 'auth/user-disabled') {
          //         reason = 'suspended';
          //     } else if (error.code === 'auth/too-many-requests') {
          //         reason = 'overquota';
          //     }
          // }
          if (error && error.code) {
            const { title, description } = setErrorMessage(error);
            reason = `${title}: ${description}`;
          }

          this._user.next(null);
          reject(reason);
        });
    });
  };

  public signOut = async (): Promise<any> => {
    console.log('LOGGING OUT');

    return await new Promise(async (resolve: any, reject: any) => {
      removeStorageItem(TOKEN_KEY);
      await fSignOut(this.auth);
      document.location.reload();
      resolve();
    });
  };
}
