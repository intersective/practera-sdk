import { login } from './services/auth/auth-service';

export class PracteraSDK {

  // Actual API URL pass to the package object.
  protected apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * this method will call login api to log in user with user credentials.
   * @param data json object - login credentials
   * @returns promise
   */
  login(data: any): any {
    return login(this.apiUrl, data);
  }

}
