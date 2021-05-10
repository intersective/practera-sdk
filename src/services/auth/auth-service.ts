import { makePostApiCall, makePutApiCall } from '../request/request-service';
import { createFullApiUrl } from '../utils/utils-service';

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
 *  email: 'abcd@gmail.com',
 *  password: '1234'
 * }
 * @returns promise
 */
export function login(apiUrl: string, body: any): any {
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
 * @param data json object - user new password and apikey
 * {
 *  password: 'abcdf',
 *  apiKey: 'asdfghghjkl12'
 * }
 * @returns promise
 */
export function resetPassword(apiUrl: string, data: any): any {
  const fullUrl = createFullApiUrl(apiUrl, api.resetPassword);
  return makePutApiCall(fullUrl, {
    password: data.password
  }, {
    headers: {
      apikey: data.apiKey
    }
  });
}
