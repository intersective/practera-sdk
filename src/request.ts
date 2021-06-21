import Axios, { AxiosRequestConfig } from 'axios';
import { has } from './utils';

/**
 * This method will append headers and URL parameters to an API request.
 * @param httpOptions Json Object - contains headers and URL parameters that need to append to the api call.
 * sample object
 * {
 *    headers: {
 *      apikey: '',
 *      service: ''
 *    },
 *    params: {
 *      domain: ''
 *    }
 * }
 * @returns Axios request config object
 */
function createRequestConfig(httpOptions: any) : AxiosRequestConfig {
  if (!httpOptions) {
    httpOptions = {};
  }

  if (!has(httpOptions, 'headers')) {
    httpOptions.headers = '';
  }
  if (!has(httpOptions, 'params')) {
    httpOptions.params = '';
  }
  return {
    timeout: 20000,
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, httpOptions.headers),
    params: httpOptions.params
  };
}

/**
 * Make get request to API using Axios.
 * @param endpoint string - Full url of the API endpoint
 * @param httpOptions Json object - Contains headers and URL parameters
 * @returns Promise
 */
export function get(endpoint: string, httpOptions?: any): Promise<any> {
  const requestConfig = createRequestConfig(httpOptions);
  return Axios.get(endpoint, requestConfig);
}

/**
 * Make post request to API using Axios.
 * @param endpoint string - Full url of the API endpoint
 * @param data Json object - data need to pass in the request body
 * @param httpOptions Json object - Contains headers and URL parameters
 * @returns Promise
 */
export function post(endpoint: string, data?: any, httpOptions?: any): Promise<any> {
  const requestConfig = createRequestConfig(httpOptions);
  return Axios.post(endpoint, data, requestConfig);
}

/**
 * Make put request to API using Axios.
 * @param endpoint string - Full url of the API endpoint
 * @param data Json object - data need to pass in the request body
 * @param httpOptions Json object - Contains headers and URL parameters
 * @returns Promise
 */
export function put(endpoint: string, data?: any, httpOptions?: any): Promise<any> {
  const requestConfig = createRequestConfig(httpOptions);
  return Axios.put(endpoint, data, requestConfig);
}
