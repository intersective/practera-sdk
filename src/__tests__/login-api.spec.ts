import { login, forgotPassword, resetPassword, mfaRegister, mfaSMS, mfaVerify } from '../data-sources/login-api';
import * as requestService from '../request';
import * as utilService from '../utils';
import { DUMMY_PASSWORD } from './mock-data';
const API_URL = 'testAPI.com/';
const API_WARNING = 'API Url and API key can not be empty';

describe('login()', () => {
  it('should call request service with testAPi.com/login and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/login');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: DUMMY_PASSWORD
    };
    login(API_URL, data);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'login');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('https://testAPI.com/login', data);
  });
});

describe('When testing forgotPassword()', () => {
  it('should call request service with testAPI.com/forgotPassword and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/forgotPassword');
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
    forgotPassword(API_URL, data);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'forgotPassword');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('https://testAPI.com/forgotPassword', requestData);
  });
});

describe('When testing resetPassword()', () => {
  it('should call request service with testAPI.com/user and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/user');
    spyOn(requestService,'makePutApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      password: DUMMY_PASSWORD
    };
    resetPassword(API_URL, apiKey, body);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'user');
    expect(requestService.makePutApiCall).toHaveBeenCalledWith('https://testAPI.com/user', {
      password: DUMMY_PASSWORD
    }, {
      headers: {
        apiKey: apiKey
      }
    });
  });
});

describe('When testing mfaSMS()', () => {
  it('should throw error if required data empty', async () => {
    try {
      await mfaSMS(API_URL, '');
    } catch (error) {
      expect(error.message).toEqual(API_WARNING);
    }
  });
  it('should call mfa sms service with full API URL and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/sms');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    mfaSMS(API_URL, apiKey);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/sms');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('https://testAPI.com/mfa/sms', {}, {
      headers: {
        apiKey: apiKey
      }
    });
  });
});

describe('When testing mfaRegister()', () => {
  it('should throw error if api url or api key is empty', async () => {
    const body = {
      countryCode: '+94',
      number: '1212323i'
    }
    try {
      await mfaRegister(API_URL, '', body);
    } catch (error) {
      expect(error.message).toEqual(API_WARNING);
    }
  });

  it('should throw error if body data is empty', async () => {
    const body = {
      countryCode: '+94',
      number: ''
    }
    try {
      await mfaRegister(API_URL, 'xcvb', body);
    } catch (error) {
      expect(error.message).toEqual('Country code and phone number can not be empty');
    }
  });

  it('should call mfa register service with full API URL and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/register');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      countryCode: '+94',
      number: '122323'
    }
    mfaRegister(API_URL, apiKey, body);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/register');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('https://testAPI.com/mfa/register', body, {
      headers: {
        apiKey: apiKey
      }
    });
  });
});

describe('When testing mfaVerify()', () => {
  it('should throw error if api url or api key is empty', async () => {
    const body = {
      code: '12345',
    };

    try {
      await mfaVerify(API_URL, '', body);
    } catch (error) {
      expect(error.message).toEqual(API_WARNING);
    }
  });

  it('should throw error if body data is empty', async () => {
    const body = {
      code: ''
    }
    try {
      await mfaVerify(API_URL, 'xcvb', body);
    } catch (error) {
      expect(error.message).toEqual('Verification code can not be empty');
    }
  });

  it('should call mfa verify service with full API URL and data', () => {
    spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/verify');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      code: '12345'
    }
    mfaVerify(API_URL, apiKey, body);
    expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/verify');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('https://testAPI.com/mfa/verify', body, {
      headers: {
        apiKey: apiKey
      }
    });
  });
});
