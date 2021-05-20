import { login, forgotPassword, resetPassword, mfaRegister, mfaSMS, mfaVerify, getConfig } from '../services/auth/auth-service';
import * as requestService from '../services/request/request-service';
import * as utilService from '../services/utils/utils-service';
import { DUMMY_PASSWORD } from './mock-data';

describe('When testing login()', () => {
  it('should call request service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/login');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      userName: 'testUser',
      password: DUMMY_PASSWORD
    };
    login('testAPI.com/', data);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'login');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/login', data);
  });
});

describe('When testing forgotPassword()', () => {
  it('should call request service with full API URL and data', () => {
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
    forgotPassword('testAPI.com/', data);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'forgotPassword');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/forgotPassword', requestData);
  });
});

describe('When testing resetPassword()', () => {
  it('should call request service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/user');
    spyOn(requestService,'makePutApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      password: DUMMY_PASSWORD
    };
    resetPassword('testAPI.com/', apiKey, body);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'user');
    expect(requestService.makePutApiCall).toHaveBeenCalledWith('testAPI.com/user', {
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
      await mfaSMS('testAPI.com/', '');
    } catch (error) {
      expect(error.message).toEqual('API Url and API key can not be empty');
    }
  });
  it('should call mfa sms service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/mfa/sms');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    mfaSMS('testAPI.com/', apiKey);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'mfa/sms');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/mfa/sms', {}, {
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
      await mfaRegister('testAPI.com/', '', body);
    } catch (error) {
      expect(error.message).toEqual('API Url and API key can not be empty');
    }
  });

  it('should throw error if body data is empty', async () => {
    const body = {
      countryCode: '+94',
      number: ''
    }
    try {
      await mfaRegister('testAPI.com/', 'xcvb', body);
    } catch (error) {
      expect(error.message).toEqual('Country code and phone number can not be empty');
    }
  });

  it('should call mfa register service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/mfa/register');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      countryCode: '+94',
      number: '122323'
    }
    mfaRegister('testAPI.com/', apiKey, body);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'mfa/register');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/mfa/register', body, {
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
      await mfaVerify('testAPI.com/', '', body);
    } catch (error) {
      expect(error.message).toEqual('API Url and API key can not be empty');
    }
  });

  it('should throw error if body data is empty', async () => {
    const body = {
      code: ''
    }
    try {
      await mfaVerify('testAPI.com/', 'xcvb', body);
    } catch (error) {
      expect(error.message).toEqual('Verification code can not be empty');
    }
  });

  it('should call mfa verify service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/mfa/verify');
    spyOn(requestService,'makePostApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const apiKey = 'axcd';
    const body = {
      code: '12345'
    }
    mfaVerify('testAPI.com/', apiKey, body);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com/', 'mfa/verify');
    expect(requestService.makePostApiCall).toHaveBeenCalledWith('testAPI.com/mfa/verify', body, {
      headers: {
        apiKey: apiKey
      }
    });
  });
});

describe('When testing getConfig()', () => {
  it('should throw error if api url is empty', async () => {
    const data = {
      domain: 'https://app.practera.com'
    }
    try {
      await getConfig('', data);
    } catch (error) {
      expect(error.message).toEqual('API Url can not be empty');
    }
  });

  it('should throw error if domain is empty', async () => {
    const data = {
      domain: '',
    };

    try {
      await getConfig('testAPI.com/', data);
    } catch (error) {
      expect(error.message).toEqual('Tech Error: Domain is compulsory!');
    }
  });

  it('should call experience list service with full API URL and data', () => {
    spyOn(utilService,'createFullApiUrl').and.returnValue('testAPI.com/api/v2/plan/experience/list');
    spyOn(requestService,'makeGetApiCall').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    const data = {
      domain: 'https://app.practera.com'
    }
    getConfig('testAPI.com', data);
    expect(utilService.createFullApiUrl).toHaveBeenCalledWith('testAPI.com', '/api/v2/plan/experience/list');
    expect(requestService.makeGetApiCall).toHaveBeenCalledWith('testAPI.com/api/v2/plan/experience/list', {
      params: data
    });
  });
});
