import { mocked } from 'ts-jest/utils';
import { post, put } from '../request';
jest.mock('../request');
import { DUMMY_PASSWORD, DUMMY_STACKS } from './mock-data';
import LoginAPI from '../data-sources/login-api';


describe('when testing login-api', () => {

  const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey';
  const LOGIN_API_URL_WARNING = 'LOGIN API URL required to use this service';
  const LOGIN_APP_URL_WARNING = 'LOGIN APP URL required to use this service';
  const USERNAME_PASS_WARNING = 'username and password can not be empty';
  const EMAIL_EMPTY_WARNING = 'Email can not be empty';
  const PASSWORD_EMPTY_WARNING = 'Password can not be empty';
  const COUNTRY_CODE_NUMBER_WARNING = 'Country code and phone number can not be empty';
  const MFA_VERIFY_WARNING = 'Verification code can not be empty';

  const API_URL = 'testAPI.com/';
  const APIKEY = 'apikey';
  const LOGINAPPURL = 'testAPP.com'

  let loginAPI: any;

  beforeEach(() => {
    loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
  });

  describe('useParams()', () => {
    it('should update class variables with new values', () => {
      loginAPI.useParams({ loginApiUrl: 'abc.com', apiKey: '1234', loginAppUrl: 'login.com' });
      expect(loginAPI["apiUrl"]).toEqual('abc.com');
      expect(loginAPI["apiKey"]).toEqual('1234');
      expect(loginAPI["loginAppUrl"]).toEqual('login.com');
    });

    it('should not update class variables if pass values empty', () => {
      loginAPI.useParams({ loginApiUrl: '', apiKey: '', loginAppUrl: '' });
      expect(loginAPI["apiUrl"]).toEqual(API_URL);
      expect(loginAPI["apiKey"]).toEqual(APIKEY);
      expect(loginAPI["loginAppUrl"]).toEqual(LOGINAPPURL);
    });
  });

  describe('login()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const t = () => {
        loginAPI.login({
          username: 'testUser',
          password: DUMMY_PASSWORD
        });
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should call request service with testAPi.com/login and data', () => {
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };
      loginAPI.login(data);
      expect(post).toHaveBeenCalledWith('https://testAPI.com/login', data);
    });

    it('should throw error if username is empty', () => {
      const data = {
        username: '',
        password: DUMMY_PASSWORD
      };
      const t = () => {
        loginAPI.login(data);
      };
      expect(t).toThrow(USERNAME_PASS_WARNING);
    });

    it('should throw error if password is empty', () => {
      const t = () => {
        loginAPI.login({
          username: 'testUser',
          password: ''
        });
      };
      expect(t).toThrow(USERNAME_PASS_WARNING);
    });
  });

  describe('When testing forgotPassword()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const t = () => {
        loginAPI.forgotPassword({
          email: 'abcd@test.com'
        });
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should call request service with testAPI.com/forgotPassword and data', () => {
      const data = {
        email: 'abcd@test.com'
      };
      const expectPassingData = {
        email: 'abcd@test.com',
        directLink: 'https://testAPP.com?action=direct&apiKey=',
        resetLink: 'https://testAPP.com?action=resetpassword&apiKey='
      }
      loginAPI.forgotPassword(data);
      expect(post).toHaveBeenCalledWith('https://testAPI.com/forgotPassword', expectPassingData);
    });

    it('should throw error if email is empty', () => {
      const t = () => {
        loginAPI.forgotPassword({
          email: ''
        });
      };
      expect(t).toThrow(EMAIL_EMPTY_WARNING);
    });

    it('should throw error if global login URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: APIKEY, loginAppUrl: '' });
      const t = () => {
        loginAPI.forgotPassword({
          email: 'abcd@test.com'
        });
      };
      expect(t).toThrow(LOGIN_APP_URL_WARNING);
    });
  });

  describe('When testing resetPassword()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const t = () => {
        loginAPI.resetPassword({
          password: DUMMY_PASSWORD
        });
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should call request service with testAPI.com/user and data', () => {
      const data = {
        password: DUMMY_PASSWORD
      };
      const expectPassingHttpOptions = {
        headers: {
          apiKey: APIKEY
        }
      };
      loginAPI.resetPassword(data);
      expect(put).toHaveBeenCalledWith('https://testAPI.com/user', data, expectPassingHttpOptions);
    });

    it('should throw error if apiKey is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: '' });
      const t = () => {
        loginAPI.resetPassword({
          password: DUMMY_PASSWORD
        });
      };
      expect(t).toThrow(APIKEY_WARNING);
    });

    it('should throw error if password is empty', () => {
      const t = () => {
        loginAPI.resetPassword({
          password: ''
        });
      };
      expect(t).toThrow(PASSWORD_EMPTY_WARNING);
    });
  });

  describe('When testing mfaSMS()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const t = () => {
        loginAPI.mfaSMS();
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should throw error if required data empty', async () => {
      loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: '' });
      const t = () => {
        loginAPI.mfaSMS();
      };
      expect(t).toThrow(APIKEY_WARNING);
    });

    it('should call mfa sms service with full API URL and data', () => {
      loginAPI.mfaSMS();
      expect(post).toHaveBeenCalledWith('https://testAPI.com/mfa/sms', {}, {
        headers: {
          apiKey: APIKEY
        }
      });
    });
  });

  describe('When testing mfaRegister()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const data = {
        countryCode: '+94',
        number: '23244343'
      }
      const t = () => {
        loginAPI.mfaRegister(data);
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should throw error if apiKey is empty', async () => {
      const data = {
        countryCode: '+94',
        number: '1212323i'
      }
      loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: '' });
      const t = () => {
        loginAPI.mfaRegister(data);
      };
      expect(t).toThrow(APIKEY_WARNING);
    });

    it('should throw error if required data is empty', async () => {
      const data = {
        countryCode: '+94',
        number: ''
      }
      const t = () => {
        loginAPI.mfaRegister(data);
      };
      expect(t).toThrow(COUNTRY_CODE_NUMBER_WARNING);
    });

    it('should call mfa register service with full API URL and data', () => {
      const data = {
        countryCode: '+94',
        number: '122323'
      }
      loginAPI.mfaRegister(data);
      expect(post).toHaveBeenCalledWith('https://testAPI.com/mfa/register', data, {
        headers: {
          apiKey: APIKEY
        }
      });
    });
  });

  describe('When testing mfaVerify()', () => {

    it('should throw errors login API URL is empty', () => {
      loginAPI = new LoginAPI({ loginApiUrl: '', apiKey: APIKEY, loginAppUrl: LOGINAPPURL });
      const data = {
        code: '2323'
      }
      const t = () => {
        loginAPI.mfaVerify(data);
      };
      expect(t).toThrow(LOGIN_API_URL_WARNING);
    });

    it('should throw error ifapiKey is empty', async () => {
      const data = {
        code: '12345',
      };

      loginAPI = new LoginAPI({ loginApiUrl: API_URL, apiKey: '' });
      const t = () => {
        loginAPI.mfaVerify(data);
      };
      expect(t).toThrow(APIKEY_WARNING);
    });

    it('should throw error if required data is empty', async () => {
      const data = {
        code: ''
      }

      const t = () => {
        loginAPI.mfaVerify(data);
      };
      expect(t).toThrow(MFA_VERIFY_WARNING);
    });

    it('should call mfa verify service with full API URL and data', () => {
      const data = {
        code: '12345'
      };
      loginAPI.mfaVerify(data);
      expect(post).toHaveBeenCalledWith('https://testAPI.com/mfa/verify', data, {
        headers: {
          apiKey: APIKEY
        }
      });
    });
  });

});
