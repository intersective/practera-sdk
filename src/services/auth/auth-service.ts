import { makePostApiCall } from '../request/request-service';
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

/**
 * This method will call login api with passed data and will return promise
 * @param apiUrl string - actual API URL.
 * @param data json object - login credentials
 * @returns promise
 */
export function login(apiUrl: string, data: any): any {
  const fullUrl = createFullApiUrl(apiUrl, api.login);
  return makePostApiCall(fullUrl, data);
}