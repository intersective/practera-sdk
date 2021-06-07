import { mocked } from 'ts-jest/utils';
import { LoginAPI } from '../data-sources/login-api';
import { post, put } from '../request';
jest.mock('../request');
import { has, isEmpty, urlFormatter } from '../utils';
jest.mock('../utils');
import { DUMMY_PASSWORD } from './mock-data';


describe('registration-service', () => {

  const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey';
  const LOGIN_API_URL_WARNING = 'LOGIN API URL required to use this service';
  const LOGIN_APP_URL_WARNING = 'LOGIN APP URL required to use this service';
  const USERNAME_PASS_WARNING = 'username and password can not be empty';
  const EMAIL_EMPTY_WARNING = 'Email can not be empty';
  const PASSWORD_EMPTY_WARNING = 'Password can not be empty';
  const COUNTRY_CODE_NUMBER_WARNING = 'Country code and phone number can not be empty';
  const MFA_VERIFY_WARNING = 'Verification code can not be empty';

  const API_URL = 'testAPI.com/';
  const APIKEY = 'appkey';
  const LOGINAPPURL = 'testAPP.com/'

  const loginAPI = new LoginAPI({loginApiUrl: API_URL, apiKey: APIKEY, loginAppUrl: LOGINAPPURL});

  const mockedPostCall = mocked(post, true);
  const mockedPutCall = mocked(put, true);

  const mockedurlFormatter = mocked(urlFormatter, true);

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedPostCall.mockClear();
    mockedPutCall.mockClear();
    mockedurlFormatter.mockClear();
  });

  describe('login()', () => {
    it('should call request service with testAPi.com/login and data', () => {
      mockedurlFormatter.mockReturnValueOnce('https://testAPI.com/login');
      mockedPostCall.mockReturnValueOnce(new Promise<void>((resolve, reject) => {
        resolve();
      }));
      const data = {
        username: 'testUser',
        password: DUMMY_PASSWORD
      };
      loginAPI.login(data);
      expect(urlFormatter).toHaveBeenCalledWith(API_URL, 'login');
      expect(mockedPostCall).toHaveBeenCalledWith('https://testAPI.com/login', data);
    });
  });

});

// describe('When testing forgotPassword()', () => {
//   it('should call request service with testAPI.com/forgotPassword and data', () => {
//     spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/forgotPassword');
//     spyOn(requestService,'post').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const data = {
//       email: 'abcd@test.com',
//       globalLoginUrl: 'https://login.practera.com'
//     };
//     const requestData = {
//       email: 'abcd@test.com',
//       directLink: 'https://login.practera.com?action=direct&apiKey=',
//       resetLink: 'https://login.practera.com?action=resetpassword&apiKey='
//     }
//     forgotPassword(API_URL, data);
//     expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'forgotPassword');
//     expect(requestService.post).toHaveBeenCalledWith('https://testAPI.com/forgotPassword', requestData);
//   });
// });

// describe('When testing resetPassword()', () => {
//   it('should call request service with testAPI.com/user and data', () => {
//     spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/user');
//     spyOn(requestService,'put').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const apiKey = 'axcd';
//     const body = {
//       password: DUMMY_PASSWORD
//     };
//     resetPassword(API_URL, apiKey, body);
//     expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'user');
//     expect(requestService.put).toHaveBeenCalledWith('https://testAPI.com/user', {
//       password: DUMMY_PASSWORD
//     }, {
//       headers: {
//         apiKey: apiKey
//       }
//     });
//   });
// });

// describe('When testing mfaSMS()', () => {
//   it('should throw error if required data empty', async () => {
//     try {
//       await mfaSMS(API_URL, '');
//     } catch (error) {
//       expect(error.message).toEqual(API_WARNING);
//     }
//   });
//   it('should call mfa sms service with full API URL and data', () => {
//     spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/sms');
//     spyOn(requestService,'post').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const apiKey = 'axcd';
//     mfaSMS(API_URL, apiKey);
//     expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/sms');
//     expect(requestService.post).toHaveBeenCalledWith('https://testAPI.com/mfa/sms', {}, {
//       headers: {
//         apiKey: apiKey
//       }
//     });
//   });
// });

// describe('When testing mfaRegister()', () => {
//   it('should throw error if api url or api key is empty', async () => {
//     const body = {
//       countryCode: '+94',
//       number: '1212323i'
//     }
//     try {
//       await mfaRegister(API_URL, '', body);
//     } catch (error) {
//       expect(error.message).toEqual(API_WARNING);
//     }
//   });

//   it('should throw error if body data is empty', async () => {
//     const body = {
//       countryCode: '+94',
//       number: ''
//     }
//     try {
//       await mfaRegister(API_URL, 'xcvb', body);
//     } catch (error) {
//       expect(error.message).toEqual('Country code and phone number can not be empty');
//     }
//   });

//   it('should call mfa register service with full API URL and data', () => {
//     spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/register');
//     spyOn(requestService,'post').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const apiKey = 'axcd';
//     const body = {
//       countryCode: '+94',
//       number: '122323'
//     }
//     mfaRegister(API_URL, apiKey, body);
//     expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/register');
//     expect(requestService.post).toHaveBeenCalledWith('https://testAPI.com/mfa/register', body, {
//       headers: {
//         apiKey: apiKey
//       }
//     });
//   });
// });

// describe('When testing mfaVerify()', () => {
//   it('should throw error if api url or api key is empty', async () => {
//     const body = {
//       code: '12345',
//     };

//     try {
//       await mfaVerify(API_URL, '', body);
//     } catch (error) {
//       expect(error.message).toEqual(API_WARNING);
//     }
//   });

//   it('should throw error if body data is empty', async () => {
//     const body = {
//       code: ''
//     }
//     try {
//       await mfaVerify(API_URL, 'xcvb', body);
//     } catch (error) {
//       expect(error.message).toEqual('Verification code can not be empty');
//     }
//   });

//   it('should call mfa verify service with full API URL and data', () => {
//     spyOn(utilService,'urlFormatter').and.returnValue('https://testAPI.com/mfa/verify');
//     spyOn(requestService,'post').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const apiKey = 'axcd';
//     const body = {
//       code: '12345'
//     }
//     mfaVerify(API_URL, apiKey, body);
//     expect(utilService.urlFormatter).toHaveBeenCalledWith(API_URL, 'mfa/verify');
//     expect(requestService.post).toHaveBeenCalledWith('https://testAPI.com/mfa/verify', body, {
//       headers: {
//         apiKey: apiKey
//       }
//     });
//   });
// });
