import { Configuration } from '../openapi';

export default class ApiConfigurationGuest extends Configuration {
  constructor (accessToken: string) {
    super();

    let baseApiPath = process.env.NEXT_PUBLIC_REACT_APP_REST_API_BASE_URL ? process.env.NEXT_PUBLIC_REACT_APP_REST_API_BASE_URL : undefined;

    if (process.env.NODE_ENV == 'development') {
      baseApiPath = process.env.NEXT_PUBLIC_REACT_APP_REST_API_BASE_URL;
    }

    this.basePath = baseApiPath;
    this.apiKey = accessToken;
    this.baseOptions = {
      'headers': { 'usertype': 'anonymous' }
    };
  }
}
