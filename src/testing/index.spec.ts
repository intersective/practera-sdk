import { PracteraSDK } from '../index';
import * as loginService from '../services/auth/auth-service';

const SAMPLE_APIKEY = 'sample-apikey';

describe('When testing login()', (): void => {
  it('should call login service with correct data', (): void => {
    spyOn(loginService,'login').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: '12345'
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.login(data);
    expect(loginService.login).toHaveBeenCalledWith('testAPI.com/', data);
  });
});

describe('When testing forgotPassword()', (): void => {
  it('should call login service with correct data', (): void => {
    spyOn(loginService,'forgotPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      email: 'abcd@test.com',
      globalLoginUrl: 'https://login.practera.com'
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.forgotPassword(data);
    expect(loginService.forgotPassword).toHaveBeenCalledWith('testAPI.com/', data);
  });
});

describe('When testing resetPassword()', (): void => {
  it('should call user service with correct data', (): void => {
    spyOn(loginService,'resetPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const body = {
      password: '1234'
    };
    const data = {
      password: '1234',
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.resetPassword(data);
    expect(loginService.resetPassword).toHaveBeenCalledWith('testAPI.com/', SAMPLE_APIKEY, body);
  });
});

describe('When testing mfaRegister()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      countryCode: '+96',
      number: '123445645',
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    try {
      sdk.mfaRegister(data);
    } catch (error) {
      expect(error.message).toEqual('Country code, phone number and apiKey can not be empty');
    }
  });

  it('should call mfa register service with correct data', (): void => {
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
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.mfaRegister(data);
    expect(loginService.mfaRegister).toHaveBeenCalledWith('testAPI.com/', SAMPLE_APIKEY, body);
  });
});

describe('When testing mfaSMS()', (): void => {
  it('should throw error if required data empty', (): void => {
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    try {
      sdk.mfaSMS();
    } catch (error) {
      expect(error.message).toEqual('User apiKey can not be empty');
    }
  });

  it('should call mfa sms service with correct data', (): void => {
    spyOn(loginService,'mfaSMS').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.mfaSMS();
    expect(loginService.mfaSMS).toHaveBeenCalledWith('testAPI.com/', SAMPLE_APIKEY);
  });
});

describe('When testing mfaVerify()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      code: ''
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    try {
      sdk.mfaVerify(data);
    } catch (error) {
      expect(error.message).toEqual('Verification code can not be empty');
    }
  });

  it('should call mfa verify service with correct data', (): void => {
    spyOn(loginService,'mfaVerify').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      code: '00435'
    };
    const body = {
      code: '00435'
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.mfaVerify(data);
    expect(loginService.mfaVerify).toHaveBeenCalledWith('testAPI.com/', SAMPLE_APIKEY, body);
  });
});

describe('When testing getCustomConfig()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      domain: ''
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    try {
      sdk.getCustomConfig(data);
    } catch (error) {
      expect(error.message).toEqual('Tech Error: Domain is compulsory!');
    }
  });

  it('should call experience list service with correct data', (): void => {
    spyOn(loginService,'getConfig').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      domain: 'https://app.practera.com'
    };
    const sdk = new PracteraSDK('testAPI.com/', SAMPLE_APIKEY);
    sdk.getCustomConfig(data);
    expect(loginService.getConfig).toHaveBeenCalledWith('testAPI.com/', data);
  });
});
