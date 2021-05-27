import { mocked } from 'ts-jest/utils';
import { PracteraSDK } from '../index';
import { DUMMY_PASSWORD } from './mock-data';
import * as loginService from '../services/auth/auth-service';

import * as registrationService from '../services/registration/registration-service';
jest.mock('../services/registration/registration-service');
const SAMPLE_APIKEY = 'sample-apikey';
const API_URL = 'testAPI.com/';
const APP_KEY = 'test-appkey';
const TEST_EMAIL = 'test@email.com';
const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey.';

describe('When testing login()', () => {
  beforeEach(() => {
    spyOn(loginService,'login').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
  });

  it('should call login service with correct data', () => {
    const data = {
      email: 'testUser',
      password: DUMMY_PASSWORD
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.login(data);
    expect(loginService.login).toHaveBeenCalledWith(API_URL, data);
  });

  it('should throw error when required data N/A', async () => {
    const data = {
      email: '',
      password: DUMMY_PASSWORD
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    try {
      const result = () => sdk.login(data);
    } catch (err) {
      expect(err.message).toEqual('Email and password must not be empty.');
    }
  });
});

describe('When testing forgotPassword()', () => {
  let sdk: PracteraSDK;
  beforeAll(() => {
    spyOn(loginService, 'forgotPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
  });

  it('should call login service with correct data', () => {
    const data = {
      email: 'abcd@test.com',
      globalLoginUrl: 'https://login.practera.com'
    };
    sdk.forgotPassword(data);
    expect(loginService.forgotPassword).toHaveBeenCalledWith(API_URL, data);
  });

  it('should throw error if email or/and globalLoginUrl are missing', async () => {
    const WARNING_MSG = 'Email and globalLoginUrl must not be empty.';
    const testData = async (data: any) => {
      try {
        await sdk.forgotPassword(data);
      } catch (err) {
        expect(err.message).toEqual(WARNING_MSG);
      }
    };

    const data1 = {
      email: '',
      globalLoginUrl: DUMMY_PASSWORD
    };

    const data2 = {
      email: 'test@emai.com',
      globalLoginUrl: ''
    };
    testData(data1);
    testData(data2);
  });
});

describe('When testing resetPassword()', () => {
  let sdk: PracteraSDK;

  it('should throw error if apiKey not provided in constructor', async () => {
    sdk = new PracteraSDK(API_URL);

    try {
      await sdk.resetPassword({ password: DUMMY_PASSWORD });
    } catch(error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should call user service with correct data', () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    spyOn(loginService,'resetPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const body = {
      password: DUMMY_PASSWORD
    };
    const data = {
      password: DUMMY_PASSWORD,
    };
    sdk.resetPassword(data);
    expect(loginService.resetPassword).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
  });

  it('should throw error if password is not provided', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    try {
      await sdk.resetPassword({
        password: ''
      });
    } catch (err) {
      expect(err.message).toEqual('Password cannot be empty.');
    }
  });
});

describe('verifyRegistration()', () => {
  let sdk: any;
  it('should throw error when apiKey not provided in constructor', async () => {
    sdk = new PracteraSDK(API_URL);
    const data = {
      appkey: APP_KEY,
      email: 'TEST_EMAIL',
      key: 'test-key',
    };
    try {
      await sdk.verifyRegistration(data);
    } catch (error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should throw error if provided parameters are wrong', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    const data = {
      appkey: APP_KEY,
      email: 'TEST_EMAIL',
      key: 'test-key',
    };
    try {
      await sdk.verifyRegistration(data);
    } catch (error) {
      expect(error.message).toEqual('Email & key values must not be empty');
    }
  });

  it('should call verify() from registration-service with correct data', () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    mocked(registrationService.verify).mockImplementation((): Promise<any> => {
      return Promise.resolve(true);
    });

    const body = {
      email: 'TEST_EMAIL',
      key: 'test-key',
    };

    const data = {
      ...body,
      appkey: APP_KEY,
    };

    sdk.verifyRegistration(data);
    expect(registrationService.verify).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, data.appkey, body);
  });
});

describe('register()', () => {
  let sdk: any;
  beforeEach(() => {
    mocked(registrationService.register).mockClear();
  });

  it('should throw error when apiKey not provided in constructor', async () => {
    sdk = new PracteraSDK(API_URL);
    const data = {
      appkey: APP_KEY,
      email: 'TEST_EMAIL',
      key: 'test-key',
    };
    try {
      await sdk.register(data);
    } catch (error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should throw error if provided parameters are wrong', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    mocked(registrationService.register).mockImplementation((): Promise<any> => {
      return Promise.resolve(true);
    });

    const data = {
      appkey: APP_KEY,
      password: DUMMY_PASSWORD,
      user_id: 'test-user-id',
    };
    try {
      await sdk.register(data);
    } catch (error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should call register() from registration-service with correct data', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    mocked(registrationService.register).mockImplementation((): Promise<any> => {
      return Promise.resolve(true);
    });

    const body = {
      user_id: 123456,
      password: DUMMY_PASSWORD,
    };

    const data = {
      ...body,
      appkey: APP_KEY,
    };

    try {
      await sdk.register(data);
      expect(mocked(registrationService.register)).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, data.appkey, body);
    } catch (err) {
      console.log('error::', err);
    }
  });
});

describe('mfaRegister()', () => {
  it('should throw error if apiKey empty', async () => {
    const data = {
      countryCode: '+96',
      number: '123445645',
    };
    const sdk = new PracteraSDK(API_URL);
    try {
      await sdk.mfaRegister(data);
    } catch (error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should throw error if country code or phone number is empty', async () => {
    const data = {
      countryCode: '+96',
      number: '',
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    try {
      await sdk.mfaRegister(data);
    } catch (error) {
      expect(error.message).toEqual('Country code and phone number can not be empty.');
    }
  });

  it('should call mfa register service with correct data', () => {
    spyOn(loginService,'mfaRegister').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const body = {
      countryCode: '+96',
      number: '123445645'
    };
    const data = {
      countryCode: '+96',
      number: '123445645',
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.mfaRegister(data);
    expect(loginService.mfaRegister).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
  });
});

describe('When testing mfaSMS()', () => {
  it('should throw error if APIKEY is missing', async () => {
    const sdk = new PracteraSDK(API_URL);
    try {
      await sdk.mfaSMS();
    } catch (error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should call mfa sms service with correct data', () => {
    spyOn(loginService,'mfaSMS').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.mfaSMS();
    expect(loginService.mfaSMS).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY);
  });
});

describe('When testing mfaVerify()', () => {
  it('should throw error if apiKey not provided in constructor', async () => {
    const sdk = new PracteraSDK(API_URL);

    try {
      await sdk.mfaVerify({ code: 'sample-code' });
    } catch(error) {
      expect(error.message).toEqual(APIKEY_WARNING);
    }
  });

  it('should throw error if verification code is empty', async () => {
    const data = {
      code: ''
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    try {
      await sdk.mfaVerify(data);
    } catch (error) {
      expect(error.message).toEqual('Verification code can not be empty');
    }
  });

  it('should call mfa verify service with correct data', () => {
    spyOn(loginService, 'mfaVerify').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      code: '00435'
    };
    const body = {
      code: '00435'
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.mfaVerify(data);
    expect(loginService.mfaVerify).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
  });
});

describe('When testing getCustomConfig()', () => {
  it('should throw error if domain is empty', async () => {
    const data = {
      domain: ''
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    try {
      await sdk.getCustomConfig(data);
    } catch (error) {
      expect(error.message).toEqual('Tech Error: Domain is compulsory!');
    }
  });

  it('should call experience list service with correct data', () => {
    spyOn(loginService,'getConfig').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      domain: 'https://app.practera.com'
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.getCustomConfig(data);
    expect(loginService.getConfig).toHaveBeenCalledWith(API_URL, data);
  });
});
