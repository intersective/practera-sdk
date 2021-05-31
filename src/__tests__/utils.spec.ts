import { createFullApiUrl, isEmpty, has } from '../utils';
import _ from "lodash";

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

describe('isEmpty()', () => {
  it('should check if target parameter is empty (undefined, null, {}, \'\')', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty(1)).toBeFalsy();
  });
});

describe('lodash extensions', () => {
  it('should has', () => {
    spyOn(_, 'has');
    has([1, 2, 3], () => true);
    expect(_.has).toHaveBeenCalled();
  });
});
