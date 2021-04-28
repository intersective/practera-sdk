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
    const sdk = new PracteraSDK('testAPI.com');
    sdk.login(data);
    expect(loginService.login).toHaveBeenCalledWith('testAPI.com', data);
  });
});
