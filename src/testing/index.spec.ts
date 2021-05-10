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
    const data = {
      email: 'abcd@test.com',
      globalLoginUrl: 'https://login.practera.com'
    };
    const sdk = new PracteraSDK('testAPI.com/');
    sdk.resetPassword(data);
    expect(loginService.resetPassword).toHaveBeenCalledWith('testAPI.com/', data);
  });
});
