import { makeGetApiCall, makePostApiCall, makePutApiCall } from '../request/request-service';
import { createFullApiUrl } from '../utils/utils-service';
import _ from 'lodash';

interface MFARigisterParams {
  countryCode: string;
  number: string;
}

interface MFAVirifyParams {
  code: string;
}

export interface ConfigParams {
  domain: string;
}

/**
 * api
 * @description list of api endpoint involved in this service
 * {Object}
 */
const api = {
  getConfig: '/api/v2/plan/experience/list',
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

const apiUrlError = 'API Url can not be empty';
const apiUrlApiKeyError = 'API Url and API key can not be empty';

function createResetDirectLinks(globalLoginUrl: string): any {
  return {
    reset: `${globalLoginUrl}?action=resetpassword&apiKey=`,
    direct: `${globalLoginUrl}?action=direct&apiKey=`
  }
}

/**
 * This method will call login api with passed data and will return promise
 * @param apiUrl string - actual API URL.
 * @param body json object - login credentials
 * {
 *  username: 'abcd@gmail.com',
 *  password: '1234'
 * }
 * @returns promise
 */
export function login(apiUrl: string, body: any): Promise<any> {
  const fullUrl = createFullApiUrl(apiUrl, api.login);
  return makePostApiCall(fullUrl, body);
}

/**
 * This method will call forgot password api with passed data and will return promise
 * @param apiUrl string - actual API URL.
 * @param data json object - user registered email address and global login url
 * {
 *  email: 'abcd@gmail.com',
 *  globalLoginUrl: 'https://login.practera.com'
 * }
 * @returns promise
 */
export function forgotPassword(apiUrl: string, data: any): any {
  const fullUrl = createFullApiUrl(apiUrl, api.forgotPassword);
  const directLinks = createResetDirectLinks(data.globalLoginUrl);
  const body = {
    email: data.email,
    resetLink: directLinks.reset,
    directLink: directLinks.direct
  }
  return makePostApiCall(fullUrl, body);
}

/**
 * This method will call reset password api with passed data and will return promise
 * @param apiUrl string - actual API URL.
 * @param apiKey string - user apikey get when user login to the system
 * @param data json object - user new password
 * {
 *  password: 'abcdf'
 * }
 * @returns promise
 */
export function resetPassword(apiUrl: string, apiKey: string, body: any): any {
  const fullUrl = createFullApiUrl(apiUrl, api.resetPassword);
  return makePutApiCall(fullUrl, body, {
    headers: {
      apiKey: apiKey
    }
  });
}

/**
 * This method will call mfa sms api to send sms to a user.
 * @param apiUrl string - actual API URL.
 * @param apiKey string - user apikey get when user login to the system
 * @returns promise
 */
export function mfaSMS(apiUrl: string, apiKey: string): any {
  if (_.isEmpty(apiUrl) || _.isEmpty(apiKey)) {
    throw new Error(apiUrlApiKeyError);
  }
  const fullUrl = createFullApiUrl(apiUrl, api.mfaSMS);
  return makePostApiCall(fullUrl, {}, {
    headers: {
      apiKey: apiKey
    }
  });
}

/**
 * This method will call mfa register api to register user phone number in the system.
 * @param apiUrl string - actual API URL.
 * @param apiKey string - user apikey get when user login to the system
 * @param data json object - country code of the mobile number, real mobile number without country code
 * {
 *  countryCode: '+94',
 *  number: '651684654'
 * }
 * @returns promise
 */
export function mfaRegister(apiUrl: string, apiKey: string, body: MFARigisterParams): any {
  if (_.isEmpty(apiUrl) || _.isEmpty(apiKey)) {
    throw new Error(apiUrlApiKeyError);
  }
  if (_.isEmpty(body.countryCode) || _.isEmpty(body.number)) {
    throw new Error('Country code and phone number can not be empty');
  }
  const fullUrl = createFullApiUrl(apiUrl, api.mfaRegister);
  return makePostApiCall(fullUrl, body, {
    headers: {
      apiKey: apiKey
    }
  });
}

/**
 * This method will call mfa verify api to verify the codes sending by sms to user.
 * @param apiUrl string - actual API URL.
 * @param apiKey string - user apikey get when user login to the system
 * @param data json object - code user type, that came as sms
 * {
 *  code: '550245'
 * }
 * @returns promise
 */
export function mfaVerify(apiUrl: string, apiKey: string, body: MFAVirifyParams): Promise<any> {
  if (_.isEmpty(apiUrl) || _.isEmpty(apiKey)) {
    throw new Error(apiUrlApiKeyError);
  }
  if (_.isEmpty(body.code)) {
    throw new Error('Verification code can not be empty');
  }
  const fullUrl = createFullApiUrl(apiUrl, api.mfaVerify);
  return makePostApiCall(fullUrl, body, {
    headers: {
      apiKey: apiKey
    }
  });
}

/**
 * This method will call experience list service to get custom config of the experience.
 * @param apiUrl string - actual API URL.
 * @param data json object - params need to pass to the api call
 * {
 *  domain: 'https://app.practera.com'
 * }
 * @returns promise
 */
export function getConfig(apiUrl: string, data: ConfigParams): Promise<any> {
  if (_.isEmpty(apiUrl)) {
    throw new Error(apiUrlError);
  }
  if (_.isEmpty(data.domain)) {
    throw new Error('Tech Error: Domain is compulsory!');
  }
  const fullUrl = createFullApiUrl(apiUrl, api.getConfig);
  return makeGetApiCall(fullUrl, {
    params: data
  });
}
