import { Subject } from 'rxjs';

const subjectToken = new Subject();

export const userAuthStateService = {
  'updateTokenData': (tokenData: string) => subjectToken.next({ 'token': tokenData }),
  'getTokenData': () => subjectToken.asObservable()
};
