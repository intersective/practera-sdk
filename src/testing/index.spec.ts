import { PracteraSDK } from '../index';
import * as loginService from '../services/auth/auth-service';

describe('When testing login()', (): void => {
  it('should call login service with correct data', (): void => {
    spyOn(loginService,'login').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: '12345'
    };
    const sdk = new PracteraSDK('testAPI.com/');
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
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.forgotPassword(data);
    expect(loginService.forgotPassword).toHaveBeenCalledWith('testAPI.com/', data);
  });
});

describe('When testing resetPassword()', (): void => {
  it('should call user service with correct data', (): void => {
    spyOn(loginService,'resetPassword').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      password: '1234'
    };
    const data = {
      password: '1234',
      apiKey: 'axcd'
    };
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.resetPassword(data);
    expect(loginService.resetPassword).toHaveBeenCalledWith('testAPI.com/', apiKey, body);
  });
});

describe('When testing mfaRegister()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      countryCode: '+96',
      number: '123445645',
      apiKey: ''
    };
    const sdk = new PracteraSDK('testAPI.com/');
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
    const apiKey = 'axcd';
    const body = {
      countryCode: '+96',
      number: '123445645'
    };
    const data = {
      countryCode: '+96',
      number: '123445645',
      apiKey: 'axcd'
    };
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.mfaRegister(data);
    expect(loginService.mfaRegister).toHaveBeenCalledWith('testAPI.com/', apiKey, body);
  });
});

describe('When testing mfaSMS()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      apiKey: ''
    };
    const sdk = new PracteraSDK('testAPI.com/');
    try {
      sdk.mfaSMS(data);
    } catch (error) {
      expect(error.message).toEqual('User apiKey can not be empty');
    }
  });

  it('should call mfa sms service with correct data', (): void => {
    spyOn(loginService,'mfaSMS').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const data = {
      apiKey: 'axcd'
    };
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.mfaSMS(data);
    expect(loginService.mfaSMS).toHaveBeenCalledWith('testAPI.com/', apiKey);
  });
});

describe('When testing mfaVerify()', (): void => {
  it('should throw error if required data empty', (): void => {
    const data = {
      apiKey: 'xyzd',
      code: ''
    };
    const sdk = new PracteraSDK('testAPI.com/');
    try {
      sdk.mfaVerify(data);
    } catch (error) {
      expect(error.message).toEqual('Verification code and user apiKey can not be empty');
    }
  });

  it('should call mfa verify service with correct data', (): void => {
    spyOn(loginService,'mfaVerify').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const data = {
      apiKey: 'axcd',
      code: '00435'
    };
    const body = {
      code: '00435'
    };
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.mfaVerify(data);
    expect(loginService.mfaVerify).toHaveBeenCalledWith('testAPI.com/', apiKey, body);
  });
});
