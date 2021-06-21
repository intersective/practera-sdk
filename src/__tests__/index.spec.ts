import { mocked } from 'ts-jest/utils';
import { DUMMY_PASSWORD, DUMMY_STACKS } from './mock-data';
import LoginAPI from '../data-sources/login-api';
import CoreAPI from '../data-sources/core-api';
jest.mock('../data-sources/login-api.ts');
jest.mock('../data-sources/core-api.ts');

import PracteraSDK from '../index';

const APIKEY = 'apikey';
const LOGIN_API_URL = 'testLoginAPI.com/';
const CORE_API_URL = 'testCoreAPI.com/';
const LOGIN_APP_URL = 'testLoginAPP.com/'
const APP_KEY = 'test-appkey';
const TEST_EMAIL = 'test@email.com';

let sdk: any;

describe('index.ts', () => {
  describe('Constructor', () => {
    it('SDK class constructs with loginAPI.useParams', () => {
      const sdk = new PracteraSDK({
        loginApiUrl: LOGIN_API_URL,
        coreApiUrl: CORE_API_URL,
        loginAppUrl: LOGIN_APP_URL,
        apiKey: APIKEY,
        appkey: APP_KEY
      });

      sdk['loginAPI'].useParams = jest.fn();
      sdk['coreAPI'].useParams = jest.fn();
      sdk.useConstructorParams({});
      expect(sdk['loginAPI'].useParams).toHaveBeenCalled();
      expect(sdk['coreAPI'].useParams).toHaveBeenCalled();
    });
  });

  beforeEach(() => {
    sdk = new PracteraSDK({
      loginApiUrl: LOGIN_API_URL,
      coreApiUrl: CORE_API_URL,
      loginAppUrl: LOGIN_APP_URL,
      apiKey: APIKEY,
      appkey: APP_KEY
    });
  });

  describe('When testing login()', () => {

    it('should call login API login service with correct data', () => {
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };
      sdk.login(data);
      expect(sdk['loginAPI'].login).toHaveBeenCalledWith(data);
    });

    it('should return correct stack data', async () => {
      sdk['loginAPI'].login = jest.fn().mockResolvedValueOnce({
        apikey: '1234',
        stacks: DUMMY_STACKS
      });
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };
      await expect(sdk.login(data)).resolves.toEqual({
        apikey: '1234',
        stacks: DUMMY_STACKS
      });
    });

    it('should return error data if password compromised', async () => {
      sdk['loginAPI'].login = jest.fn().mockRejectedValueOnce({
        status: 400,
        error: {passwordCompromised: true}
      });
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };

      try {
        const result = await sdk.login(data);
      } catch(err) {
        expect(err).toEqual({
          status: 400,
          error: { passwordCompromised: true }
        });
      }
    });
  });

  describe('directLogin()', () => {
    it('should call directLogin()', async () => {
      sdk['loginAPI'].login = jest.fn();
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };

      try {
        const result = await sdk.directLogin(data);
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });

  describe('When testing forgotPassword()', () => {

    it('should call login API forgotpassword service with correct data', () => {
      const data = {
        email: 'abcd@test.com'
      };
      sdk.forgotPassword(data);
      expect(sdk['loginAPI'].forgotPassword).toHaveBeenCalledWith(data);
    });

    it('should return correct data from login API forgotpassword service success', async () => {
      sdk['loginAPI'].forgotPassword = jest.fn().mockResolvedValueOnce({
        message: "operation successful"
      });
      const data = {
        email: 'abcd@test.com'
      };
      await expect(sdk.forgotPassword(data)).resolves.toEqual({
        message: "operation successful"
      });
    });

    it('should return error data if forgot password call too frequently', async () => {
      sdk['loginAPI'].forgotPassword = jest.fn().mockRejectedValueOnce({
        error: {
          type: 'reset_too_frequently'
        }
      });
      const data = {
        email: 'abcd@test.com'
      };
      await expect(sdk.forgotPassword(data)).rejects.toEqual({
        error: {type: 'reset_too_frequently'}
      });
    });
  });

  describe('When testing resetPassword()', () => {

    it('should call login API resetPassword service with correct data', () => {
      const data = {
        password: '123456'
      };
      sdk.resetPassword(data);
      expect(sdk['loginAPI'].resetPassword).toHaveBeenCalledWith(data);
    });

    it('should call login API user service with correct data', async () => {
      sdk['loginAPI'].resetPassword = jest.fn().mockResolvedValueOnce({
        message: "operation successful"
      });
      const data = {
        password: DUMMY_PASSWORD
      };
      await expect(sdk.resetPassword(data)).resolves.toEqual({
        message: "operation successful"
      });
    });

    it('should return error data if password compromised', async () => {
      sdk['loginAPI'].resetPassword = jest.fn().mockRejectedValueOnce({
        status: 400,
        error: {passwordCompromised: true}
      });
      const data = {
        password: DUMMY_PASSWORD
      };
      await expect(sdk.resetPassword(data)).rejects.toEqual({
        status: 400,
        error: {passwordCompromised: true}
      });
    });
  });

  describe('mfaRegister()', () => {

    it('should call login API mfaRegister service with correct data', () => {
      const data = {
        countryCode: '+94',
        number: '7348823'
      };
      sdk.mfaRegister(data);
      expect(sdk['loginAPI'].mfaRegister).toHaveBeenCalledWith(data);
    });

    it('should call login API mfaRegister service with correct data', async () => {
      sdk['loginAPI'].mfaRegister = jest.fn().mockResolvedValueOnce({
        message: "operation successful"
      });
      const data = {
        password: DUMMY_PASSWORD
      };
      await expect(sdk.mfaRegister(data)).resolves.toEqual({
        message: "operation successful"
      });
    });

  });

  describe('register()', () => {
    it('should access CoreAPI register()', async () => {
      try {
        await sdk.register({});
        expect(sdk.coreAPI.register).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });

  describe('verifyRegistration()', () => {
    it('should access to CoreAPI verifyRegistration()', async () => {
      try {
        await sdk.verifyRegistration();
        expect(sdk.coreAPI.verifyRegistration).toHaveBeenCalled();
      } catch(err) {
        expect(err).toBeFalsy();
      }
    });
  });

  describe('mfaSMS()', () => {
    it('should access to LoginAPI mfaSMS()', async () => {
      try {
        await sdk.mfaSMS();
        expect(sdk.loginAPI.mfaSMS).toHaveBeenCalled();
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });

  describe('mfaVerify()', () => {
    it('should access to LoginAPI mfaVerify()', async () => {
      try {
        await sdk.mfaVerify();
        expect(sdk.loginAPI.mfaVerify).toHaveBeenCalled();
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });

  describe('getCustomConfig()', () => {
    it('should access to CoreAPI getCustomConfig()', async () => {
      try {
        await sdk.getCustomConfig();
        expect(sdk.coreAPI.getConfig).toHaveBeenCalled();
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });
});
