
import { DUMMY_PASSWORD } from './mock-data';

import { post, get } from '../request';
jest.mock('../request');
import CoreAPI from '../data-sources/core-api';

describe('when testing core-api', () => {

  const CORE_API_URL_WARNING = 'CORE API URL required to use this service';
  const APP_KEY_WARNING = 'APPKEY required to use this service';
  const PASS_USER_ID_KEY_WARNING = 'Password, user_id & key can not be empty';
  const EMAIL_KEY_WARNING = 'Email & key values can not be empty';
  const DOMAIN_WARNING = 'Tech Error: Domain is compulsory!';

  const apiurl = 'test.com/';
  const appkey = 'appkey';

  let coreAPI: any;

  beforeEach(() => {
    coreAPI = new CoreAPI({ coreApiUrl: apiurl, appkey: appkey });
  });

  describe('useParams()', () => {
    it('should update class variables with new values', () => {
      coreAPI.useParams({ coreApiUrl: 'abc.com', appkey: '1234' });
      expect(coreAPI["apiUrl"]).toEqual('abc.com');
      expect(coreAPI["appkey"]).toEqual('1234');
    });

    it('should not update class variables if pass values empty', () => {
      coreAPI.useParams({ coreApiUrl: '', appkey: '' });
      expect(coreAPI["apiUrl"]).toEqual(apiurl);
      expect(coreAPI["appkey"]).toEqual(appkey);
    });
  });

  describe('verifyRegistration()', () => {
    it('should throw errors core API URL is empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: '', appkey: appkey });
      const t = () => {
        coreAPI.verifyRegistration({
          key: 'test',
          email: 'ascd@sd.com'
        });
      };
      expect(t).toThrow(CORE_API_URL_WARNING);
    });
    it('should throw errors apiKeyis empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: apiurl, appkey: '' });
      const t = () => {
        coreAPI.verifyRegistration({
          key: 'test',
          email: 'ascd@sd.com'
        });
      };
      expect(t).toThrow(APP_KEY_WARNING);
    });
    it('should verify user registration is valid', () => {
      coreAPI.verifyRegistration({
        email: 'test@email.com',
        key: 'test'
      });
      expect(post).toHaveBeenCalledWith("https://test.com/api/verification_codes.json", {
        "email": "test@email.com",
        "key": "test"
      }, {
        "headers": {
          "appkey": "appkey"
        }
      });
    });


    it('should fail if improper parameters provided', () => {
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
    it('should throw errors core API URL is empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: '', appkey: appkey });
      const t = () => {
        coreAPI.register({
          password: '1212',
          user_id: 12345,
          key: '12345',
        });
      };
      expect(t).toThrow(CORE_API_URL_WARNING);
    });
    it('should throw errors apiKeyis empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: apiurl, appkey: '' });
      const t = () => {
        coreAPI.register({
          password: '1212',
          user_id: 12345,
          key: '12345',
        });
      };
      expect(t).toThrow(APP_KEY_WARNING);
    });
    it('should call request service with full url and data', () => {
      coreAPI.register({
        password: DUMMY_PASSWORD,
        user_id: 12345,
        key: '12345',
      });
      expect(post).toHaveBeenCalled();
    });

    it('should fail if improper parameters provided', () => {
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

    it('should throw errors core API URL is empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: '', appkey: appkey });
      const data = {
        domain: 'abc.com',
      };
      const t = () => {
        coreAPI.getConfig(data);
      };
      expect(t).toThrow(CORE_API_URL_WARNING);
    });
    it('should throw errors apiKeyis empty', () => {
      coreAPI = new CoreAPI({ coreApiUrl: apiurl, appkey: '' });
      const data = {
        domain: 'abc.com',
      };
      const t = () => {
        coreAPI.getConfig(data);
      };
      expect(t).toThrow(APP_KEY_WARNING);
    });

    it('should throw error if domain is empty', async () => {
      const data = {
        domain: '',
      };
      const call = () => {
        coreAPI.getConfig(data);
      };
      expect(call).toThrow(DOMAIN_WARNING);
    });

    it('should call experience list service with full API URL and data', () => {
      const data = {
        domain: 'https://app.practera.com',
      };
      coreAPI.getConfig(data);
      expect(get).toHaveBeenCalledWith('https://test.com/api/v2/plan/experience/list', {
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
