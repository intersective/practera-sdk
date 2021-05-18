import {
  login,
  forgotPassword,
  resetPassword,
  mfaRegister,
  mfaSMS,
  mfaVerify,
  getConfig,
  ConfigParams
} from './services/auth/auth-service';
import _ from 'lodash';

interface MFARigisterParams {
  countryCode: string;
  number: string;
  apiKey: string;
}

interface MFAVerifyParams {
  code: string;
  apiKey: string;
}

interface MFASMSParams {
  apiKey: string;
}

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
  login(data: any): Promise<any> {
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
  forgotPassword(data: any): Promise<any> {
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
  resetPassword(data: any): Promise<any> {
    return resetPassword(this.apiUrl, data.apiKey, {
      password: data.password,
    });
  }

  /**
   * This method will call mfa register api to register user phone number in the system.
   * @param data json object - country code of the mobile number, real mobile number without country code
   * {
   *  countryCode: '+94',
   *  number: '651684654',
   *  apiKey: 'asdsadsdfefwe2343'
   * }
   * @returns promise
   */
  mfaRegister(data: MFARigisterParams): Promise<any> {
    if (_.isEmpty(data.countryCode) || _.isEmpty(data.number) || _.isEmpty(data.apiKey)) {
      throw new Error('Country code, phone number and apiKey can not be empty');
    }
    return mfaRegister(this.apiUrl, data.apiKey, {
      countryCode: data.countryCode,
      number: data.number,
    });
  }

  /**
   * This method will call mfa sms api to send sms to a user.
   * @param data json object - user apikey get when user login to the system
   * {
   *  apiKey: 'asdhkj'
   * }
   * @returns promise
   */
  mfaSMS(data: MFASMSParams): Promise<any> {
    if (_.isEmpty(data.apiKey)) {
      throw new Error('User apiKey can not be empty');
    }
    return mfaSMS(this.apiUrl, data.apiKey);
  }

  /**
   * This method will call mfa verify api to verify the codes sending by sms to user.
   * @param data json object - code user type, that came as sms and user apiKey
   * {
   *  code: '1234',
   *  apiKey: 'asdhkj'
   * }
   * @returns promise
   */
  mfaVerify(data: MFAVerifyParams): Promise<any> {
    if (_.isEmpty(data.code) || _.isEmpty(data.apiKey)) {
      throw new Error('Verification code and user apiKey can not be empty');
    }
    return mfaVerify(this.apiUrl, data.apiKey, {
      code: data.code,
    });
  }

  /**
   * This method will call experience list api to get custom config of the experience.
   * @param apiUrl string - actual API URL.
   * @param data json object - params need to pass to the api call
   * {
   *  domain: 'https://app.practera.com',
   *  
   * }
   * @returns promise
   */
  getCustomConfig(data: ConfigParams): Promise<any> {
    if (_.isEmpty(data.domain)) {
      throw new Error('Tech Error: Domain is compulsory!');
    }
    return getConfig(this.apiUrl, data);
  }
}
