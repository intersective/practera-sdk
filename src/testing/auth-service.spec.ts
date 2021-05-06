import { login, forgotPassword } from '../services/auth/auth-service';
import * as requestService from '../services/request/request-service';
import * as utilService from '../services/utils/utils-service';

describe('When testing login()', (): void => {
  it('should call request service with full API URL and data', (): void => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/login');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: '12345'
    };
    login('testAPI.com', data);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com', 'login');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/login', data);
  });
});

describe('When testing forgotPassword()', (): void => {
  it('should call request service with full API URL and data', (): void => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/forgotPassword');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      email: 'abcd@test.com',
      globalLoginUrl: 'https://login.practera.com'
    };
    const requestData = {
      email: 'abcd@test.com',
      directLink: 'https://login.practera.com?action=direct&apiKey=',
      resetLink: 'https://login.practera.com?action=resetpassword&apiKey='
    }
    forgotPassword('testAPI.com', data);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com', 'forgotPassword');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/forgotPassword', requestData);
  });
});
