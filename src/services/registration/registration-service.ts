import { makePostApiCall, makePutApiCall } from '../request/request-service';
import { createFullApiUrl } from '../utils/utils-service';
import _ from "lodash";

interface RegisterData {
  password: string;
  user_id: number;
  key: string;
}

/**
 * api
 * @description list of api endpoint involved in this service
 * {Object}
 */
const api = {
  register: '/api/registration_details.json',
  verify: '/api/verification_codes.json',
};


/**
 * Activating & register new user through API endpoint
 * @param apiUrl string - actual API URL.
 * @param body json object - login credentials
 * {
 *   password: string;
 *   user_id: number;
 *   key: string;
 * }
 * @returns promise
 */
export function register(apiUrl: string, apiKey: string, appkey: string, body: RegisterData): Promise<any> {
  const fullUrl = createFullApiUrl(apiUrl, api.register);
  return makePostApiCall(fullUrl, body, {
    headers: {
      apiKey,
      appkey,
    }
  });
}

export function verify(apiUrl: string, apiKey: string, appkey: string, body: any): Promise<any> {
  const fullUrl = createFullApiUrl(apiUrl, api.verify);
  return makePostApiCall(fullUrl, body, {
    headers: {
      apiKey,
      appkey,
    }
  });
}