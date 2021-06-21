import { post, put } from '../request';
import { urlFormatter, isEmpty } from '../utils';

interface ConstructorParams {
  loginApiUrl: string;
  apiKey?: string;
  loginAppUrl?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DirectLoginCredentials {
  apikey: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  password: string;
}

export interface MFARegister {
  countryCode: string;
  number: string;
}

export interface MFAVerify {
  code: string;
}

/**
 * api
 * @description list of api endpoint involved in this service
 * {Object}
 */
const api = {
  login: 'login',
  forgotPassword: 'forgotPassword',
  resetPassword: 'user',
  mfaRegister: 'mfa/register',
  mfaSMS: 'mfa/sms',
  mfaVerify: 'mfa/verify',
  switchStack: 'switchStack',
  findByUser: 'stacks',
  getStack: 'stack'
};

// Error and Warning messages.
const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey';
const LOGIN_API_URL_WARNING = 'LOGIN API URL required to use this service';
const LOGIN_APP_URL_WARNING = 'LOGIN APP URL required to use this service';
const USERNAME_PASS_WARNING = 'username and password can not be empty';
const EMAIL_EMPTY_WARNING = 'Email can not be empty';
const PASSWORD_EMPTY_WARNING = 'Password can not be empty';
const COUNTRY_CODE_NUMBER_WARNING = 'Country code and phone number can not be empty';
const MFA_VERIFY_WARNING = 'Verification code can not be empty';
const DIRECT_LOGIN_WARNING = 'Direct login required user API KEY.';

export default class LoginAPI {

  protected apiUrl = '';
  protected loginAppUrl = '';
  protected apiKey = '';

  constructor(params: ConstructorParams) {
    if (params.loginApiUrl) {
      this.apiUrl = params.loginApiUrl;
    }

    if (params.apiKey) {
      this.apiKey = params.apiKey;
    }

    if (params.loginAppUrl) {
      this.loginAppUrl = params.loginAppUrl;
    }
  }

  /**
   * Assign values to instance variables if they passed.
   * @param {ConstructorParams} params parameters that can pass through constructor
   */
  useParams(params: ConstructorParams): void {
    if (params.loginApiUrl && !isEmpty(params.loginApiUrl)) {
      this.apiUrl = params.loginApiUrl;
    }
    if (params.apiKey && !isEmpty(params.apiKey)) {
      this.apiKey = params.apiKey;
    }
    if (params.loginAppUrl && !isEmpty(params.loginAppUrl)) {
      this.loginAppUrl = params.loginAppUrl;
    }
  }

  private createResetDirectLinks(): any {
    return {
      reset: `${urlFormatter(this.loginAppUrl)}?action=resetpassword&apiKey=`,
      direct: `${urlFormatter(this.loginAppUrl)}?action=direct&apiKey=`
    }
  }


  /**
   * This method will call login api with passed data and will return promise
   * @param {LoginCredentials} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  login(data: LoginCredentials): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(data.username) || isEmpty(data.password)) {
      throw new Error(USERNAME_PASS_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.login);
    return post(fullUrl, data);
  }

  /**
   * This method will call login api with apikey for direct login and will return promise
   * @param {DirectLoginCredentials} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  directLogin(data: DirectLoginCredentials): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(data.apikey)) {
      throw new Error(DIRECT_LOGIN_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.login);
    return post(fullUrl, {}, {
      headers: {
        apikey: data.apikey
      }
    });
  }

  /**
   * This method will call forgot password api with passed data and will return promise
   * @param {ForgotPassword} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  forgotPassword(data: ForgotPassword): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.loginAppUrl)) {
      throw new Error(LOGIN_APP_URL_WARNING);
    }
    if (isEmpty(data.email)) {
      throw new Error(EMAIL_EMPTY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.forgotPassword);
    const directLinks = this.createResetDirectLinks();
    const body = {
      email: data.email,
      resetLink: directLinks.reset,
      directLink: directLinks.direct
    }
    return post(fullUrl, body);
  }

  /**
   * This method will call reset password api with passed data and will return promise
   * @param {ResetPassword} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  resetPassword(data: ResetPassword): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    if (isEmpty(data.password)) {
      throw new Error(PASSWORD_EMPTY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.resetPassword);
    return put(fullUrl, data, {
      headers: {
        apiKey: this.apiKey
      }
    });
  }

  /**
   * This method will call mfa sms api to send sms to a user.
   * @return {Promise<any>} axios promise respond
   */
  mfaSMS(): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.mfaSMS);
    return post(fullUrl, {}, {
      headers: {
        apiKey: this.apiKey
      }
    });
  }

  /**
   * This method will call mfa register api to register user phone number in the system.
   * @param {MFARegister} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  mfaRegister(data: MFARegister): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    if (isEmpty(data.countryCode) || isEmpty(data.number)) {
      throw new Error(COUNTRY_CODE_NUMBER_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.mfaRegister);
    return post(fullUrl, data, {
      headers: {
        apiKey: this.apiKey
      }
    });
  }

  /**
   * This method will call mfa verify api to verify the codes sending by sms to user.
   * @param {MFAVerify} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  mfaVerify(data: MFAVerify): Promise<any> {
    if (isEmpty(this.apiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    if (isEmpty(data.code)) {
      throw new Error(MFA_VERIFY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.mfaVerify);
    return post(fullUrl, data, {
      headers: {
        apiKey: this.apiKey
      }
    });
  }

}
