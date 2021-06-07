import { mocked } from 'ts-jest/utils';
import { DUMMY_PASSWORD } from './mock-data';

import { post, get } from '../request';
jest.mock('../request');
import { CoreAPI } from '../data-sources/core-api';

describe('registration-service', () => {

  const CORE_API_URL_WARNING = 'CORE API URL required to use this service';
  const APP_KEY_WARNING = 'APPKEY required to use this service';
  const PASS_USER_ID_KEY_WARNING = 'Password, user_id & key can not be empty';
  const EMAIL_KEY_WARNING = 'Email & key values can not be empty';
  const DOMAIN_WARNING = 'Tech Error: Domain is compulsory!';

  const apiurl = 'test.com/';
  const appkey = 'appkey';

  let coreAPI = new CoreAPI({coreApiUrl: apiurl, appkey: appkey});

  const mockedPostCall = mocked(post, true);
  const mockedGetCall = mocked(get, true);

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedPostCall.mockClear();
    mockedGetCall.mockClear();
  });

  it('should throw errors data pass to constructor is empty', () => {
    try {
      coreAPI = new CoreAPI({coreApiUrl: '', appkey: appkey});
    } catch (error) {
      expect(error.message).toEqual(CORE_API_URL_WARNING);
    }
    try {
      coreAPI = new CoreAPI({coreApiUrl: apiurl, appkey: ''});
    } catch (error) {
      expect(error.message).toEqual(APP_KEY_WARNING);
    }
  });

	describe('verify()', () => {
    it('should verify user registration is valid', () => {
      coreAPI.verifyRegistration({
        email: 'test@email.com',
        key: 'test'
      });
      expect(mockedPostCall).toHaveBeenCalledWith("https://test.com/api/verification_codes.json", {
        "email": "test@email.com",
        "key": "test"
      }, {
        "headers": {
          "appkey": "appkey"
        }
      });
    });

    it('should fail if improper parameters provided', () => {
      mockedPostCall.mockClear();
      const t = () => {
        coreAPI.verifyRegistration({
          key: 'test',
          email: ''
        });
      };
      expect(t).toThrow(EMAIL_KEY_WARNING);
    });
  });

	describe('register()', () => {
		it('should call request service with full url and data', () => {
      mockedPostCall.mockClear();
			coreAPI.register({
        password: DUMMY_PASSWORD,
        user_id: 12345,
        key: '12345',
      });
      expect(mockedPostCall).toHaveBeenCalled();
		});

    it('should fail if improper parameters provided', () => {
      mockedPostCall.mockClear();
      const t = () => {
        coreAPI.register({
          password: '',
          user_id: 12345,
          key: '12345',
        });
      };
      expect(t).toThrow(PASS_USER_ID_KEY_WARNING);
    });
	});

  describe('When testing getConfig()', () => {

    it('should throw error if domain is empty', async () => {
      mockedGetCall.mockClear();
      const data = {
        domain: '',
      };
      const call = () => {
        coreAPI.getConfig(data);
      };
      expect(call).toThrow(DOMAIN_WARNING);
    });

    it('should call experience list service with full API URL and data', () => {
      mockedGetCall.mockClear();
      const data = {
        domain: 'https://app.practera.com',
      };
      coreAPI.getConfig(data);
      expect(mockedGetCall).toHaveBeenCalledWith('https://test.com/api/v2/plan/experience/list', {
        params: {
          domain: 'https://app.practera.com',
        },
        headers: {
          appkey: appkey
        }
      });
    });
  });

});
