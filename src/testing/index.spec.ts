import { mocked } from 'ts-jest/utils';
import { PracteraSDK } from '../index';
import { DUMMY_PASSWORD } from './mock-data';
import * as loginService from '../services/auth/auth-service';

import * as registrationService from '../services/registration/registration-service';
jest.mock('../services/registration/registration-service');
const SAMPLE_APIKEY = 'sample-apikey';
const API_URL = 'testAPI.com/';

describe('When testing login()', () => {
  it('should call login service with correct data', () => {
    spyOn(loginService,'login').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: DUMMY_PASSWORD
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.login(data);
    expect(loginService.login).toHaveBeenCalledWith(API_URL, data);
  });
});

describe('When testing forgotPassword()', () => {
  it('should call login service with correct data', () => {
    spyOn(loginService,'forgotPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      email: 'abcd@test.com',
      globalLoginUrl: 'https://login.practera.com'
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.forgotPassword(data);
    expect(loginService.forgotPassword).toHaveBeenCalledWith(API_URL, data);
  });
});

describe('When testing resetPassword()', () => {
  it('should throw error if apiKey not provided in constructor', async () => {
    const sdk = new PracteraSDK(API_URL);

    try {
      await sdk.resetPassword({ password: DUMMY_PASSWORD });
    } catch(error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
    }
  });

  it('should call user service with correct data', () => {
    spyOn(loginService,'resetPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const body = {
      password: DUMMY_PASSWORD
    };
    const data = {
      password: DUMMY_PASSWORD,
    };
    const sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);
    sdk.resetPassword(data);
    expect(loginService.resetPassword).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
  });
});

describe('verifyRegistration()', () => {
  let sdk: any;
  it('should throw error when apiKey not provided in constructor', async () => {
    sdk = new PracteraSDK(API_URL);
    const data = {
      appkey: 'test-appkey',
      email: 'test@email.com',
      key: 'test-key',
    };
    try {
      await sdk.verifyRegistration(data);
    } catch (error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
    }
  });

  it('should throw error if provided parameters are wrong', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    const data = {
      appkey: 'test-appkey',
      email: 'test@email.com',
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
      email: 'test@email.com',
      key: 'test-key',
    };

    const data = {
      ...body,
      appkey: 'test-appkey',
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
      appkey: 'test-appkey',
      email: 'test@email.com',
      key: 'test-key',
    };
    try {
      await sdk.register(data);
    } catch (error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
    }
  });

  it('should throw error if provided parameters are wrong', async () => {
    sdk = new PracteraSDK(API_URL, SAMPLE_APIKEY);

    mocked(registrationService.register).mockImplementation((): Promise<any> => {
      return Promise.resolve(true);
    });

    const data = {
      appkey: 'test-appkey',
      password: DUMMY_PASSWORD,
      user_id: 'test-user-id',
    };
    try {
      await sdk.register(data);
    } catch (error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
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
      appkey: 'test-appkey',
    };

    try {
      await sdk.register(data);
      expect(mocked(registrationService.register)).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, data.appkey, body);
    } catch (err) {
      console.log('error::', err);
    }
  });
});

describe('When testing mfaRegister()', () => {
  it('should throw error if apiKey empty', async () => {
    const data = {
      countryCode: '+96',
      number: '123445645',
    };
    const sdk = new PracteraSDK(API_URL);
    try {
      await sdk.mfaRegister(data);
    } catch (error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
    }
  });

  it('should throw error if required data empty', async () => {
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
  it('should throw error if required data empty', async () => {
    const sdk = new PracteraSDK(API_URL);
    try {
      await sdk.mfaSMS();
    } catch (error) {
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
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
      expect(error.message).toEqual('PracteraSDK instance must be instantiated with apikey.');
    }
  });

  it('should throw error if required data empty', async () => {
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
  it('should throw error if required data empty', async () => {
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
