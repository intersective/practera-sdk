import { createFullApiUrl } from '../services/utils/utils-service';

describe('When testing createFullApiUrl()', (): void => {
  it('should return full API URL', (): void => {
    const domain = 'testAPI.com';
    const fullUrl: string = createFullApiUrl(`https://${domain}/`, 'login');
    expect(fullUrl).toEqual(`https://${domain}/login`);
  });
  it('should console error if apiUrl empty', (): void => {
    spyOn(console, 'error');
    const fullUrl: string = createFullApiUrl('', 'login');
    expect(console.error).toBeCalled();
  });
  it('should console error if endPoint empty', (): void => {
    spyOn(console, 'error');
    const fullUrl: string = createFullApiUrl('testAPI.com/', '');
    expect(console.error).toBeCalled();
  });
});
