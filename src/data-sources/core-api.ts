import { post, get } from '../request';
import { urlFormatter, isEmpty } from '../utils';
interface ConstructorParams {
  coreApiUrl: string;
  appkey: string;
}

export interface Registration {
  password: string;
  user_id: number;
  key: string;
}

export interface VerifyRegistration {
  email: string;
  key: string;
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
  register: '/api/registration_details.json',
  verify: '/api/verification_codes.json',
  getConfig: '/api/v2/plan/experience/list'
};

// Error and Warning messages.
const CORE_API_URL_WARNING = 'CORE API URL required to use this service';
const APP_KEY_WARNING = 'APPKEY required to use this service';
const PASS_USER_ID_KEY_WARNING = 'Password, user_id & key can not be empty';
const EMAIL_KEY_WARNING = 'Email & key values can not be empty';
const DOMAIN_WARNING = 'Tech Error: Domain is compulsory!';

export class CoreAPI {
  protected apiUrl = '';
  protected appkey = '';

  constructor(params: ConstructorParams) {
    if (isEmpty(params.coreApiUrl)) {
      throw new Error(CORE_API_URL_WARNING);
    }
    if (isEmpty(params.appkey)) {
      throw new Error(APP_KEY_WARNING);
    }
    this.apiUrl = params.coreApiUrl;
    this.appkey = params.appkey;
  }

  /**
   * Assign values to instance variables if they passed.
   * @param {ConstructorParams} params parameters that can pass through constructor
   */
  useParams(params: ConstructorParams): void {
    if (params.coreApiUrl) {
      this.apiUrl = params.coreApiUrl;
    }
    if (params.appkey) {
      this.appkey = params.appkey;
    }
  }

  /**
   * Activating & register new user through API endpoint
   * @param {Registration} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  register(data: Registration): Promise<any> {
    if (isEmpty(data.password) || typeof data.user_id != 'number' || isEmpty(data.key)) {
      throw new Error(PASS_USER_ID_KEY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.register);
    return post(fullUrl, data, {
      headers: {
        appkey: this.appkey
      }
    });
  }

  /**
   * verify user registration by checking email with unique key
   * @param  {VerifyRegistration} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  verifyRegistration(data: VerifyRegistration): Promise<any> {
    if (isEmpty(data.email) || isEmpty(data.key)) {
      throw new Error(EMAIL_KEY_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.verify);
    return post(fullUrl, data, {
      headers: {
        appkey: this.appkey
      }
    });
  }

  /**
   * This method will call experience list service to get custom config of the experience.
   * @param {ConfigParams} data mandatory content required by endpoint
   * @return {Promise<any>} axios promise respond
   */
  getConfig(data: ConfigParams): Promise<any> {
    if (isEmpty(data.domain)) {
      throw new Error(DOMAIN_WARNING);
    }
    const fullUrl = urlFormatter(this.apiUrl, api.getConfig);
    return get(fullUrl, {
      headers: {
        appkey: this.appkey
      },
      params: data
    });
  }

}
