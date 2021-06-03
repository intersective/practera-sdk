import { post, get } from '../request';
import { urlFormatter, isEmpty } from '../utils';

interface Registration {
  password: string;
  user_id: number;
  key: string;
}

interface VerifyRegistration {
  email: string;
  key: string;
}

interface ConfigParams {
  domain: string;
}

/**
 * api
 * @description list of api endpoint involved in this service
 * {Object}
 */
const api = {
  register: '/api/registration_details.json',
  verify: '/api/verification_codes.json',
  getConfig: '/api/v2/plan/experience/list'
};

/**
 * Activating & register new user through API endpoint
 * @param apiUrl string - actual API URL.
 * @param apiKey string - actual API URL.
 * @param body json object - login credentials
 * {
 *   password: string;
 *   user_id: number;
 *   key: string;
 * }
 * @returns promise
 */
export function register(apiUrl: string, apiKey: string, appkey: string, body: Registration): Promise<any> {
  if (isEmpty(body.password) || typeof body.user_id != "number" || isEmpty(body.key)) {
    throw new Error("Password, user_id & key must not be empty");
  }

  const fullUrl = urlFormatter(apiUrl, api.register);
  return post(fullUrl, body, {
    headers: {
      apiKey,
      appkey,
    }
  });
}

/**
 * verify user registration by checking email with unique key
 * @param  {string}             apiUrl endpoint domain url
 * @param  {string}             apiKey user's session
 * @param  {string}             appkey app specific id
 * @param  {VerifyRegistration} body   mandatory content required by endpoint
 * @return {Promise<any>}              axios promise respond
 */
export function verify(apiUrl: string, apiKey: string, appkey: string, body: VerifyRegistration): Promise<any> {
  if (isEmpty(body.email) || isEmpty(body.key)) {
    throw new Error("Email & key values must not be empty");
  }

  const fullUrl = urlFormatter(apiUrl, api.verify);
  return post(fullUrl, body, {
    headers: {
      apiKey,
      appkey,
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
  if (isEmpty(data.domain)) {
    throw new Error('Tech Error: Domain is compulsory!');
  }
  const fullUrl = urlFormatter(apiUrl, api.getConfig);
  return get(fullUrl, {
    params: data
  });
}
