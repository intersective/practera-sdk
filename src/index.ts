import {
  login,
  forgotPassword,
  resetPassword,
  mfaRegister,
  mfaSMS,
  mfaVerify
} from "./data-sources/login-api";
import {
  register,
  verify as verifyRegistration,
  getConfig
} from './data-sources/core-api';
import { isEmpty } from './utils';

const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey.';
const LOGIN_API_URL_WARNING = 'LOGIN API URL required to use this service.';
const CORE_API_URL_WARNING = 'CORE API URL required to use this service.';
const LOGIN_APP_URL_WARNING = 'LOGIN APP URL required to use this service.';

interface ConstructorParams {
  loginApiUrl?: string;
  coreApiUrl?: string;
  chatApiUrl?: string;
  graphqlUrl?: string;
  apiKey?: string;
  loginAppUrl?: string;
}

export class PracteraSDK {
  protected apiKey = '';
  protected loginAppUrl = '';
  protected loginApiUrl = '';
  protected coreApiUrl = '';

  /**
   * Initicalising the Practera SDK
   * @param {ConstructorParams} params parameters that can pass through constructor
   */
  constructor(params: ConstructorParams) {
    this.useConstructorParams(params);
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
    if (params.apiKey) {
      this.apiKey = params.apiKey;
    }
    if (params.loginAppUrl) {
      this.loginAppUrl = params.loginAppUrl;
    }
  }

  /**
   * this method will call login api to log in user with user credentials.
   * @param data json object - login credentials
   * {
   *  username: 'abcd@gmail.com',
   *  password: '1234'
   * }
   * @returns promise
   */
  login(data: {
    username: string;
    password: string;
  }): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(data.username) || isEmpty(data.password)) {
      throw new Error('username and password cannot be empty.');
    }

    return login(this.loginApiUrl, data);
  }

  /**
   * this method will call forgot password api to send password rest email to provided email address.
   * @param data json object - user registered email address and global login url
   * {
   *  email: 'abcd@gmail.com'
   * }
   * @returns promise
   */
  forgotPassword(data: {
    email: string;
  }): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.loginAppUrl)) {
      throw new Error(LOGIN_APP_URL_WARNING);
    }
    if (isEmpty(data.email)) {
      throw new Error('Email cannot be empty.');
    }
    return forgotPassword(this.loginApiUrl, {
      email: data.email,
      globalLoginUrl: this.loginAppUrl
    });
  }

  /**
   * this method will call reset password api to reset user password.
   * @param data json object - User new password and reset password apikey came in email.
   * {
   *  password: '1234'
   * }
   * @returns promise
   */
  resetPassword(data: {
    password: string;
  }): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    if (isEmpty(data.password)) {
      throw new Error('Password cannot be empty.');
    }

    return resetPassword(this.loginApiUrl, this.apiKey, {
      password: data.password,
    });
  }

  /**
   * register user through Register endpoint
   * @param  data json object - User new password, user_id & registration key code
   * {
   *  appkey: 'abcd1234',
   *  password: '1234',
   *  user_id: 120005,
   *  key: 'wesf2323',
   * }
   * @returns promise
   */
  register(data: {
    appkey: string;
    password: string;
    user_id: number;
    key: string;
  }): Promise<any> {
    if (isEmpty(this.coreApiUrl)) {
      throw new Error(CORE_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    const { password, user_id, key } = data;
    return register(this.coreApiUrl, this.apiKey, data.appkey, {
      password,
      user_id,
      key,
    });
  }

  /**
   * verify current registration validity
   * @param  data json object - User new password, user_id & registration key code
   * {
   *  appkey: 'abcd1234',
   *  email: 'test@email.com',
   *  key: 12345,
   * }
   * @returns promise
   */
  verifyRegistration(data: {
    appkey: string;
    email: string;
    key: string;
  }): Promise<any> {
    if (isEmpty(this.coreApiUrl)) {
      throw new Error(CORE_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    const { email, key } = data;
    return verifyRegistration(this.coreApiUrl, this.apiKey, data.appkey, {
      email,
      key,
    });
  }

  /**
   * This method will call mfa register api to register user phone number in the system.
   * @param data json object - country code of the mobile number, real mobile number without country code
   * {
   *  countryCode: '+94',
   *  number: '651684654',
   * }
   * @returns promise
   */
  mfaRegister(data: {
    countryCode: string;
    number: string;
  }): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    if (isEmpty(data.countryCode) || isEmpty(data.number)) {
      throw new Error('Country code and phone number can not be empty.');
    }

    return mfaRegister(this.loginApiUrl, this.apiKey, {
      countryCode: data.countryCode,
      number: data.number,
    });
  }

  /**
   * This method will call mfa sms api to send sms to a user.
   * @returns promise
   */
  mfaSMS(): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    return mfaSMS(this.loginApiUrl, this.apiKey);
  }

  /**
   * This method will call mfa verify api to verify the codes sending by sms to user.
   * @param data json object - code user type, that came as sms and user apiKey
   * {
   *  code: '1234',
   * }
   * @returns promise
   */
  mfaVerify(data: {
    code: string;
  }): Promise<any> {
    if (isEmpty(this.loginApiUrl)) {
      throw new Error(LOGIN_API_URL_WARNING);
    }
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    if (isEmpty(data.code)) {
      throw new Error('Verification code can not be empty');
    }

    return mfaVerify(this.loginApiUrl, this.apiKey, {
      code: data.code,
    });
  }

  /**
   * This method will call experience list api to get custom config of the experience.
   * @param apiUrl string - actual API URL.
   * @param data json object - params need to pass to the api call
   * {
   *  domain: 'https://app.practera.com'
   * }
   * @returns promise
   */
  getCustomConfig(data: {
    domain: string;
  }): Promise<any> {
    if (isEmpty(this.coreApiUrl)) {
      throw new Error(CORE_API_URL_WARNING);
    }
    if (isEmpty(data.domain)) {
      throw new Error('Tech Error: Domain is compulsory!');
    }
    return getConfig(this.coreApiUrl, data);
  }

}
