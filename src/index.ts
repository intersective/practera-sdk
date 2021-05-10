import { login, forgotPassword, resetPassword } from './services/auth/auth-service';

export class PracteraSDK {

  // Actual API URL pass to the package object.
  protected apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * this method will call login api to log in user with user credentials.
   * @param data json object - login credentials
   * {
   *  email: 'abcd@gmail.com',
   *  password: '1234'
   * }
   * @returns promise
   */
  login(data: any): any {
    return login(this.apiUrl, data);
  }

  /**
  * this method will call forgot password api to send password rest email to provided email address.
  * @param data json object - user registered email address and global login url
  * {
  *  email: 'abcd@gmail.com',
  *  globalLoginUrl: 'https://login.practera.com'
  * }
  * @returns promise
  */
  forgotPassword(data: any): any {
    return forgotPassword(this.apiUrl, data);
  }

  /**
  * this method will call reset password api to reset user password.
  * @param data json object - User new password and reset password apikey came in email.
  * {
  *  password: '1234',
  *  apiKey: 'asdhkj'
  * }
  * @returns promise
  */
  resetPassword(data: any): any {
    return resetPassword(this.apiUrl, data);
  }

}
