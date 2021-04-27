/**
 * Method will combine the API url with endpoint and create full URL for request.
 * @param apiUrl string - Api actual URL
 * @param endpoint string - Api endpoint
 * @returns string - Full API URL.
 */
export function createFullApiUrl(apiUrl: string, endPoint: string): any {
  if (!apiUrl || !endPoint) {
    console.error('apiUrl and endPoint is required');
  }
  return `${apiUrl}/${endPoint}`;
}
