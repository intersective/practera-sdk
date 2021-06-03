// import { mocked } from 'ts-jest/utils';
// import { PracteraSDK } from '../index';
// import { DUMMY_PASSWORD } from './mock-data';
// import * as loginAPI from '../data-sources/login-api';

// import * as coreAPI from '../data-sources/core-api';
// jest.mock('../data-sources/core-api.ts');
// const SAMPLE_APIKEY = 'sample-apikey';
// const API_URL = 'testAPI.com/';
// const APP_KEY = 'test-appkey';
// const TEST_EMAIL = 'test@email.com';
// const APIKEY_WARNING = 'PracteraSDK instance must be instantiated with apikey.';
// const LOGIN_API_URL_WARNING = 'LOGIN API URL required to use this service.';
// const CORE_API_URL_WARNING = 'CORE API URL required to use this service.';
// const LOGIN_APP_URL_WARNING = 'LOGIN APP URL required to use this service.';

// describe('When testing login()', () => {
//   beforeEach(() => {
//     spyOn(loginAPI,'login').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//   });

//   it('should call login service with correct data', () => {
//     const data = {
//       username: 'testUser',
//       password: DUMMY_PASSWORD
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL});
//     sdk.login(data);
//     expect(loginAPI.login).toHaveBeenCalledWith(API_URL, data);
//   });

//   it('should throw error when required data N/A', async () => {
//     const data = {
//       username: '',
//       password: DUMMY_PASSWORD
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL});
//     try {
//       await sdk.login(data);
//     } catch (err) {
//       expect(err.message).toEqual('username and password cannot be empty.');
//     }
//   });
//   it('should throw error when loginApiUrl N/A', async () => {
//     const data = {
//       username: 'testUser',
//       password: DUMMY_PASSWORD
//     };
//     const sdk = new PracteraSDK({});
//     try {
//       await sdk.login(data);
//     } catch (err) {
//       expect(err.message).toEqual(LOGIN_API_URL_WARNING);
//     }
//   });
// });

// describe('When testing forgotPassword()', () => {
//   let sdk: PracteraSDK;
//   beforeAll(() => {
//     spyOn(loginAPI, 'forgotPassword').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//   });

//   it('should call login service with correct data', () => {
//     sdk = new PracteraSDK({loginApiUrl: API_URL, loginAppUrl: 'loginApp.com'});
//     const data = {
//       email: 'abcd@test.com'
//     };
//     const expectData = {
//       email: 'abcd@test.com',
//       globalLoginUrl: 'loginApp.com'
//     }
//     sdk.forgotPassword(data);
//     expect(loginAPI.forgotPassword).toHaveBeenCalledWith(API_URL, expectData);
//   });

//   it('should throw error if email is missing', async () => {
//     const WARNING_MSG = 'Email cannot be empty.';
//     sdk = new PracteraSDK({loginApiUrl: API_URL, loginAppUrl: 'loginApp.com'});
//     const testData = async (data1: any) => {
//       try {
//         await sdk.forgotPassword(data1);
//       } catch (err) {
//         expect(err.message).toEqual(WARNING_MSG);
//       }
//     };

//     const data = {
//       email: '',
//     };
//     testData(data);
//   });

//   it('should throw error if loginAppUrl is missing', async () => {
//     sdk = new PracteraSDK({loginApiUrl: API_URL});
//     const testData = async (data2: any) => {
//       try {
//         await sdk.forgotPassword(data2);
//       } catch (err) {
//         expect(err.message).toEqual(LOGIN_APP_URL_WARNING);
//       }
//     };

//     const data = {
//       email: 'test@emai.com'
//     };
//     testData(data);
//   });

//   it('should throw error if loginApiUrl is missing', async () => {
//     sdk = new PracteraSDK({loginAppUrl: API_URL});
//     const testData = async (data2: any) => {
//       try {
//         await sdk.forgotPassword(data2);
//       } catch (err) {
//         expect(err.message).toEqual(LOGIN_API_URL_WARNING);
//       }
//     };

//     const data = {
//       email: 'test@emai.com'
//     };
//     testData(data);
//   });
// });

// describe('When testing resetPassword()', () => {
//   let sdk: PracteraSDK;

//   it('should throw error if loginApiUrl not provided in constructor', async () => {
//     sdk = new PracteraSDK({apiKey: API_URL});

//     try {
//       await sdk.resetPassword({ password: DUMMY_PASSWORD });
//     } catch(error) {
//       expect(error.message).toEqual(LOGIN_API_URL_WARNING);
//     }
//   });

//   it('should throw error if apiKey not provided in constructor', async () => {
//     sdk = new PracteraSDK({loginApiUrl: API_URL});

//     try {
//       await sdk.resetPassword({ password: DUMMY_PASSWORD });
//     } catch(error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should call user service with correct data', () => {
//     sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     spyOn(loginAPI,'resetPassword').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const body = {
//       password: DUMMY_PASSWORD
//     };
//     const data = {
//       password: DUMMY_PASSWORD,
//     };
//     sdk.resetPassword(data);
//     expect(loginAPI.resetPassword).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
//   });

//   it('should throw error if password is not provided', async () => {
//     sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     try {
//       await sdk.resetPassword({
//         password: ''
//       });
//     } catch (err) {
//       expect(err.message).toEqual('Password cannot be empty.');
//     }
//   });
// });

// describe('verifyRegistration()', () => {
//   let sdk: any;

//   it('should throw error when coreApiUrl not provided in constructor', async () => {
//     sdk = new PracteraSDK({});
//     const data = {
//       appkey: APP_KEY,
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };
//     try {
//       await sdk.verifyRegistration(data);
//     } catch (error) {
//       expect(error.message).toEqual(CORE_API_URL_WARNING);
//     }
//   });

//   it('should throw error when apiKey not provided in constructor', async () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL});
//     const data = {
//       appkey: APP_KEY,
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };
//     try {
//       await sdk.verifyRegistration(data);
//     } catch (error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should throw error if provided parameters are wrong', async () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     const data = {
//       appkey: APP_KEY,
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };
//     try {
//       await sdk.verifyRegistration(data);
//     } catch (error) {
//       expect(error.message).toEqual('Email & key values must not be empty');
//     }
//   });

//   it('should call verify() from registration-service with correct data', () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     mocked(coreAPI.verify).mockImplementation((): Promise<any> => {
//       return Promise.resolve(true);
//     });

//     const body = {
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };

//     const data = {
//       ...body,
//       appkey: APP_KEY,
//     };

//     sdk.verifyRegistration(data);
//     expect(coreAPI.verify).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, data.appkey, body);
//   });
// });

// describe('register()', () => {
//   let sdk: any;
//   beforeEach(() => {
//     mocked(coreAPI.register).mockClear();
//   });

//   it('should throw error when coreApiUrl not provided in constructor', async () => {
//     sdk = new PracteraSDK({});
//     const data = {
//       appkey: APP_KEY,
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };
//     try {
//       await sdk.register(data);
//     } catch (error) {
//       expect(error.message).toEqual(CORE_API_URL_WARNING);
//     }
//   });

//   it('should throw error when apiKey not provided in constructor', async () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL});
//     const data = {
//       appkey: APP_KEY,
//       email: TEST_EMAIL,
//       key: 'test-key',
//     };
//     try {
//       await sdk.register(data);
//     } catch (error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should throw error if provided parameters are wrong', async () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     mocked(coreAPI.register).mockImplementation((): Promise<any> => {
//       return Promise.resolve(true);
//     });

//     const data = {
//       appkey: APP_KEY,
//       password: DUMMY_PASSWORD,
//       user_id: 'test-user-id',
//     };
//     try {
//       await sdk.register(data);
//     } catch (error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should call register() from registration-service with correct data', async () => {
//     sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});

//     mocked(coreAPI.register).mockImplementation((): Promise<any> => {
//       return Promise.resolve(true);
//     });

//     const body = {
//       user_id: 123456,
//       password: DUMMY_PASSWORD,
//     };

//     const data = {
//       ...body,
//       appkey: APP_KEY,
//     };

//     try {
//       await sdk.register(data);
//       expect(mocked(coreAPI.register)).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, data.appkey, body);
//     } catch (err) {
//       console.log('error::', err);
//     }
//   });
// });

// describe('mfaRegister()', () => {
//   it('should throw error if loginApiUrl empty', async () => {
//     const data = {
//       countryCode: '+96',
//       number: '123445645',
//     };
//     const sdk = new PracteraSDK({});
//     try {
//       await sdk.mfaRegister(data);
//     } catch (error) {
//       expect(error.message).toEqual(LOGIN_API_URL_WARNING);
//     }
//   });

//   it('should throw error if apiKey empty', async () => {
//     const data = {
//       countryCode: '+96',
//       number: '123445645',
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL});
//     try {
//       await sdk.mfaRegister(data);
//     } catch (error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should throw error if country code or phone number is empty', async () => {
//     const data = {
//       countryCode: '+96',
//       number: '',
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     try {
//       await sdk.mfaRegister(data);
//     } catch (error) {
//       expect(error.message).toEqual('Country code and phone number can not be empty.');
//     }
//   });

//   it('should call mfa register service with correct data', () => {
//     spyOn(loginAPI,'mfaRegister').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const body = {
//       countryCode: '+96',
//       number: '123445645'
//     };
//     const data = {
//       countryCode: '+96',
//       number: '123445645',
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     sdk.mfaRegister(data);
//     expect(loginAPI.mfaRegister).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
//   });
// });

// describe('When testing mfaSMS()', () => {
//   it('should throw error if loginApiUrl is missing', async () => {
//     const sdk = new PracteraSDK({});
//     try {
//       await sdk.mfaSMS();
//     } catch (error) {
//       expect(error.message).toEqual(LOGIN_API_URL_WARNING);
//     }
//   });

//   it('should throw error if APIKEY is missing', async () => {
//     const sdk = new PracteraSDK({loginApiUrl: API_URL});
//     try {
//       await sdk.mfaSMS();
//     } catch (error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should call mfa sms service with correct data', () => {
//     spyOn(loginAPI,'mfaSMS').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     sdk.mfaSMS();
//     expect(loginAPI.mfaSMS).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY);
//   });
// });

// describe('When testing mfaVerify()', () => {
//   it('should throw error if loginApiUrl not provided in constructor', async () => {
//     const sdk = new PracteraSDK({});

//     try {
//       await sdk.mfaVerify({ code: 'sample-code' });
//     } catch(error) {
//       expect(error.message).toEqual(LOGIN_API_URL_WARNING);
//     }
//   });

//   it('should throw error if apiKey not provided in constructor', async () => {
//     const sdk = new PracteraSDK({loginApiUrl: API_URL});

//     try {
//       await sdk.mfaVerify({ code: 'sample-code' });
//     } catch(error) {
//       expect(error.message).toEqual(APIKEY_WARNING);
//     }
//   });

//   it('should throw error if verification code is empty', async () => {
//     const data = {
//       code: ''
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     try {
//       await sdk.mfaVerify(data);
//     } catch (error) {
//       expect(error.message).toEqual('Verification code can not be empty');
//     }
//   });

//   it('should call mfa verify service with correct data', () => {
//     spyOn(loginAPI, 'mfaVerify').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const data = {
//       code: '00435'
//     };
//     const body = {
//       code: '00435'
//     };
//     const sdk = new PracteraSDK({loginApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     sdk.mfaVerify(data);
//     expect(loginAPI.mfaVerify).toHaveBeenCalledWith(API_URL, SAMPLE_APIKEY, body);
//   });
// });

// describe('When testing getCustomConfig()', () => {
//   it('should throw error if coreApiUrl not provided in constructor', async () => {
//     const sdk = new PracteraSDK({});
//     const data = {
//       domain: 'https://app.practera.com'
//     };
//     try {
//       await sdk.getCustomConfig(data);
//     } catch(error) {
//       expect(error.message).toEqual(CORE_API_URL_WARNING);
//     }
//   });

//   it('should throw error if domain is empty', async () => {
//     const data = {
//       domain: ''
//     };
//     const sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     try {
//       await sdk.getCustomConfig(data);
//     } catch (error) {
//       expect(error.message).toEqual('Tech Error: Domain is compulsory!');
//     }
//   });

//   it('should call experience list service with correct data', () => {
//     spyOn(coreAPI,'getConfig').and.returnValue(new Promise<void>((resolve, reject) => {
//       resolve();
//     }));
//     const data = {
//       domain: 'https://app.practera.com'
//     };
//     const sdk = new PracteraSDK({coreApiUrl: API_URL, apiKey: SAMPLE_APIKEY});
//     sdk.getCustomConfig(data);
//     expect(coreAPI.getConfig).toHaveBeenCalledWith(API_URL, data);
//   });
// });
