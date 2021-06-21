import LoginAPI, { LoginCredentials, DirectLoginCredentials, ForgotPassword, ResetPassword, MFAVerify, MFARegister } from "./data-sources/login-api";
import CoreAPI, { Registration, VerifyRegistration, ConfigParams } from './data-sources/core-api';

export interface ConstructorParams {
  loginApiUrl?: string;
  coreApiUrl?: string;
  chatApiUrl?: string;
  graphqlUrl?: string;
  loginAppUrl?: string;
  apiKey?: string;
  appkey?: string;
}

export default class PracteraSDK {

  // API Variables
  private loginAPI!: LoginAPI;
  private coreAPI!: CoreAPI;

  // class Variables
  protected apiKey = '';
  protected appkey = '';
  protected loginAppUrl = '';
  protected loginApiUrl = '';
  protected coreApiUrl = '';

  /**
   * Initicalising the Practera SDK
   * @param {ConstructorParams} params parameters that can pass through constructor
   */
  constructor(params: ConstructorParams) {
    this.useConstructorParams(params);

    this.loginAPI = new LoginAPI({
      loginApiUrl: this.loginApiUrl,
      loginAppUrl: this.loginAppUrl,
      apiKey: this.apiKey
    });

    this.coreAPI = new CoreAPI({
      coreApiUrl: this.coreApiUrl,
      appkey: this.appkey
    });
  }

  /**
   * Assign values to instance variables if they passed.
   * @param {ConstructorParams} params parameters that can pass through constructor
   */
  useConstructorParams(params: ConstructorParams): void {
    if (params.loginApiUrl) {
      this.loginApiUrl = params.loginApiUrl;
    }
    if (params.coreApiUrl) {
      this.coreApiUrl = params.coreApiUrl;
    }
    if (params.loginAppUrl) {
      this.loginAppUrl = params.loginAppUrl;
    }
    if (params.apiKey) {
      this.apiKey = params.apiKey;
    }
    if (params.appkey) {
      this.appkey = params.appkey;
    }

    // Update variables of Login API Instence.
    if (this.loginAPI) {
      this.loginAPI.useParams({
        loginApiUrl: this.loginApiUrl,
        loginAppUrl: this.loginAppUrl,
        apiKey: this.apiKey
      });
    }

    // Update variables of Core API Instence.
    if (this.coreAPI) {
      this.coreAPI.useParams({
        coreApiUrl: this.coreApiUrl,
        appkey: this.appkey
      });
    }
  }

  /**
   * this method will call login api to log in user with user credentials.
   * @param {LoginCredentials} data login credentials
   * {
   *  username: 'abcd@gmail.com',
   *  password: '1234'
   * }
   * @return {Promise<any>} axios promise respond
   */

  login(data: LoginCredentials): Promise<any> {
    return this.loginAPI.login(data);
  }

  /**
   * this method will call login api to log in user with user credentials.
   * @param {DirectLoginCredentials} data direct login credentials
   * {
   *  apikey: '123445',
   * }
   * @return {Promise<any>} axios promise respond
   */

  directLogin(data: DirectLoginCredentials): Promise<any> {
    return this.loginAPI.directLogin(data);
  }

  /**
   * this method will call forgot password api to send password rest email to provided email address.
   * @param {ForgotPassword} data user registered email address
   * {
   *  email: 'abcd@gmail.com'
   * }
   * @return {Promise<any>} axios promise respond
   */
  forgotPassword(data: ForgotPassword): Promise<any> {
    return this.loginAPI.forgotPassword(data);
  }

  /**
   * this method will call reset password api to reset user password.
   * @param {ResetPassword} data user new password.
   * {
   *  password: '1234'
   * }
   * @return {Promise<any>} axios promise respond
   */
  resetPassword(data: ResetPassword): Promise<any> {
    return this.loginAPI.resetPassword(data);
  }

  /**
   * register user through Register endpoint
   * @param {Registration} data user new password, user_id & registration key code
   * {
   *  password: '1234',
   *  user_id: 120005,
   *  key: 'wesf2323',
   * }
   * @return {Promise<any>} axios promise respond
   */
  register(data: Registration): Promise<any> {
    return this.coreAPI.register(data);
  }

  /**
   * verify current registration validity
   * @param {VerifyRegistration} data user registered & registration key code
   * {
   *  email: 'test@email.com',
   *  key: 12345,
   * }
   * @return {Promise<any>} axios promise respond
   */
  verifyRegistration(data: VerifyRegistration): Promise<any> {
    return this.coreAPI.verifyRegistration(data);
  }

  /**
   * This method will call mfa register api to register user phone number in the system.
   * @param {MFARegister} data country code of the mobile number, real mobile number without country code
   * {
   *  countryCode: '+94',
   *  number: '651684654',
   * }
   * @return {Promise<any>} axios promise respond
   */
  mfaRegister(data: MFARegister): Promise<any> {
    return this.loginAPI.mfaRegister(data);
  }

  /**
   * This method will call mfa sms api to send sms to a user.
   * @return {Promise<any>} axios promise respond
   */
  mfaSMS(): Promise<any> {
    return this.loginAPI.mfaSMS();
  }

  /**
   * This method will call mfa verify api to verify the codes sending by sms to user.
   * @param {MFAVerify} data code received as sms
   * {
   *  code: '1234',
   * }
   * @return {Promise<any>} axios promise respond
   */
  mfaVerify(data: MFAVerify): Promise<any> {
    return this.loginAPI.mfaVerify(data);
  }

  /**
   * This method will call experience list api to get custom config of the experience.
   * @param {ConfigParams} data domain of the app
   * {
   *  domain: 'https://app.practera.com'
   * }
   * @return {Promise<any>} axios promise respond
   */
  getCustomConfig(data: ConfigParams): Promise<any> {
    return this.coreAPI.getConfig(data);
  }

}
