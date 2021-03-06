import * as _ from 'lodash';

/** check if a value is empty
   * precautions:
   *  - Lodash's isEmpty, by default, sees "number" type value as empty,
   *    but in our case, we just treat null/undefined/""/[]/{} as empty.
   *  - [{}] = true
   *  - [{}, {}, {}] = false
   *
   * @param  any     value
   * @return boolean   true: when empty string/object/array, otherwise false
   */
export const isEmpty = (value: any): boolean => {
  // number type value shouldn't be treat as empty
  if (typeof value === 'number') {
    return false;
  }
  return _.isEmpty(value);
}

export const has = (object: any, path: any): boolean => {
  return _.has(object, path);
}

/**
 * Given a domain and endpoint string, return an absolute url formatted string
 *
 * e.g.
 * test.practera.com - login => https://test.practera.com/login
 *
 * @name urlFormatter
 * @param {string} domain url
 * @param {string} endpoint optional relative url
 * @return {string}   combination of scheme+domain+endpoint
 */
export const urlFormatter = (domain: string, endpoint?: string): string => {
  // always need http as prefix
  let theDomain = !domain.match(/^http/) ? `https://${domain}` : domain;
  // remove / in suffix
  theDomain = theDomain.replace(/\/$/, '');
  if (!endpoint) {
    return theDomain;
  }
  // always have / in prefix
  let theEndpoint = !endpoint.match(/^\//) ? `/${endpoint}` : endpoint;
  // remove / in suffix
  theEndpoint = theEndpoint.replace(/\/$/, '');
  return `${theDomain}${theEndpoint}`;
};
