import { urlFormatter, isEmpty, has } from '../utils';
import _ from "lodash";

describe('When testing urlFormatter()', (): void => {
  it('should return full API URL', (): void => {
    const domains = [
      'test.practera.com',
      'http://test.practera.com',
      'https://test.practera.com',
      'test.practera.com/',
      'http://test.practera.com/',
      'https://test.practera.com/',
    ];
    const endpoints = ['login', '/login', 'login/', undefined];

    domains.forEach(domain => {
      endpoints.forEach(endpoint => {
        expect(urlFormatter(domain, endpoint)).toMatchSnapshot(`"${domain}", "${endpoint}"`);
      });
    });
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
