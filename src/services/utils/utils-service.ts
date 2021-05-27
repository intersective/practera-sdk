/**
 * Method will combine the API url with endpoint and create full URL for request.
 * @param apiUrl string - Api actual URL
 * @param endpoint string - Api endpoint
 * @returns string - Full API URL.
 */
export const createFullApiUrl = (apiUrl: string, endPoint: string): string => {
  if (!apiUrl || !endPoint) {
    console.error('apiUrl and endPoint is required');
  }
  return urlFormatter(apiUrl, endPoint);
};

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
