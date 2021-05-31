import {
  login,
  forgotPassword,
  resetPassword,
  mfaRegister,
  mfaSMS,
  mfaVerify,
  getConfig,
  ConfigParams
} from "./data-sources/login-api";
import {
  register,
  verify as verifyRegistration
} from './data-sources/core-api';
import { isEmpty } from './utils';

interface MFARigisterParams {
  countryCode: string;
  number: string;
}

interface MFAVerifyParams {
  code: string;
}

const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey.';

export class PracteraSDK {
  // Actual API URL pass to the package object.
  protected apiUrl: string;
  protected apiKey = '';

  constructor(apiUrl: string, apiKey?: string) {
    this.apiUrl = apiUrl;

    // make apiKey optional, not every use case need apiKey
    if (apiKey) {
      this.apiKey = apiKey;
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
    if (isEmpty(data.username) || isEmpty(data.password)) {
      throw new Error('username and password cannot be empty.');
    }

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
  forgotPassword(data: {
    email: string;
  }): Promise<any> {
    // @TODO need to check global login passed from constructor
    if (isEmpty(data.email)) {
      throw new Error('Email cannot be empty.');
    }
    return forgotPassword(this.apiUrl, data);
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
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    if (isEmpty(data.password)) {
      throw new Error('Password cannot be empty.');
    }

    return resetPassword(this.apiUrl, this.apiKey, {
      password: data.password,
    });
  }

  /**
   * register user through Register endpoint
   * @param  data json object - User new password, user_id & registration key code
   * {
   *  appkey: 'abcd1234',
   *  password: '1234',
   *  user_id: 'asdhkj',
   *  key: 12345,
   * }
   * @returns promise
   */
  register(data: any): Promise<any> {
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    const { password, user_id, key } = data;
    return register(this.apiUrl, this.apiKey, data.appkey, {
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
  verifyRegistration(data: any): Promise<any> {
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    const { email, key } = data;
    return verifyRegistration(this.apiUrl, this.apiKey, data.appkey, {
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
  mfaRegister(data: MFARigisterParams): Promise<any> {
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }

    if (isEmpty(data.countryCode) || isEmpty(data.number)) {
      throw new Error('Country code and phone number can not be empty.');
    }

    return mfaRegister(this.apiUrl, this.apiKey, {
      countryCode: data.countryCode,
      number: data.number,
    });
  }

  /**
   * This method will call mfa sms api to send sms to a user.
   * @returns promise
   */
  mfaSMS(): Promise<any> {
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    return mfaSMS(this.apiUrl, this.apiKey);
  }

  /**
   * This method will call mfa verify api to verify the codes sending by sms to user.
   * @param data json object - code user type, that came as sms and user apiKey
   * {
   *  code: '1234',
   * }
   * @returns promise
   */
  mfaVerify(data: MFAVerifyParams): Promise<any> {
    if (isEmpty(this.apiKey)) {
      throw new Error(APIKEY_WARNING);
    }
    if (isEmpty(data.code)) {
      throw new Error('Verification code can not be empty');
    }

    return mfaVerify(this.apiUrl, this.apiKey, {
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
  getCustomConfig(data: ConfigParams): Promise<any> {
    if (isEmpty(data.domain)) {
      throw new Error('Tech Error: Domain is compulsory!');
    }
    return getConfig(this.apiUrl, data);
  }
}
