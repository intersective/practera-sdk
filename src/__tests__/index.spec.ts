import { mocked } from 'ts-jest/utils';
import { DUMMY_PASSWORD, DUMMY_STACKS } from './mock-data';
import LoginAPI from '../data-sources/login-api';
import CoreAPI from '../data-sources/core-api';
import PracteraSDK from '../index';
jest.mock('../data-sources/login-api.ts');
jest.mock('../data-sources/core-api.ts');

const APIKEY = 'apikey';
const LOGIN_API_URL = 'testLoginAPI.com/';
const CORE_API_URL = 'testCoreAPI.com/';
const LOGIN_APP_URL = 'testLoginAPP.com/'
const APP_KEY = 'test-appkey';
const TEST_EMAIL = 'test@email.com';

// let coreAPI: any;
// let loginAPI: any;
let sdk: any;

beforeEach(() => {
  sdk = new PracteraSDK({
    loginApiUrl: LOGIN_API_URL,
    coreApiUrl: CORE_API_URL,
    loginAppUrl: LOGIN_APP_URL,
    apiKey: APIKEY,
    appkey: APP_KEY});
});

describe('When testing login()', () => {

  it('should call login API login service with correct data', () => {
    const data = {
      username: 'testUser',
      password: DUMMY_PASSWORD
    };
    sdk.login(data);
    expect(sdk['loginAPI'].login).toHaveBeenCalledWith(data);
  });

  it('should return correct stack data', async () => {
    sdk['loginAPI'].login = jest.fn().mockResolvedValueOnce({
      apikey: '1234',
      stacks: DUMMY_STACKS
    });
    const data = {
      username: 'testUser',
      password: DUMMY_PASSWORD
    };
    await expect(sdk.login(data)).resolves.toEqual({
      apikey: '1234',
      stacks: DUMMY_STACKS
    });
  });

  it('should return error data if password compromised', async () => {
    sdk['loginAPI'].login = jest.fn().mockRejectedValueOnce({
      status: 400,
      error: {passwordCompromised: true}
    });
    const data = {
      username: 'testUser',
      password: DUMMY_PASSWORD
    };
    await expect(sdk.login(data)).rejects.toEqual({
      status: 400,
      error: {passwordCompromised: true}
    });
  });
});

describe('When testing forgotPassword()', () => {

  it('should call login API forgotpassword service with correct data', () => {
    const data = {
      email: 'abcd@test.com'
    };
    sdk.forgotPassword(data);
    expect(sdk['loginAPI'].forgotPassword).toHaveBeenCalledWith(data);
  });

  it('should return correct data from login API forgotpassword service success', async () => {
    sdk['loginAPI'].forgotPassword = jest.fn().mockResolvedValueOnce({
      message: "operation successful"
    });
    const data = {
      email: 'abcd@test.com'
    };
    await expect(sdk.forgotPassword(data)).resolves.toEqual({
      message: "operation successful"
    });
  });

  it('should return error data if forgot password call too frequently', async () => {
    sdk['loginAPI'].forgotPassword = jest.fn().mockRejectedValueOnce({
      error: {
        type: 'reset_too_frequently'
      }
    });
    const data = {
      email: 'abcd@test.com'
    };
    await expect(sdk.forgotPassword(data)).rejects.toEqual({
      error: {type: 'reset_too_frequently'}
    });
  });
});

describe('When testing resetPassword()', () => {

  it('should call login API resetPassword service with correct data', () => {
    const data = {
      password: '123456'
    };
    sdk.resetPassword(data);
    expect(sdk['loginAPI'].resetPassword).toHaveBeenCalledWith(data);
  });

  it('should call login API user service with correct data', async () => {
    sdk['loginAPI'].resetPassword = jest.fn().mockResolvedValueOnce({
      message: "operation successful"
    });
    const data = {
      password: DUMMY_PASSWORD
    };
    await expect(sdk.resetPassword(data)).resolves.toEqual({
      message: "operation successful"
    });
  });

  it('should return error data if password compromised', async () => {
    sdk['loginAPI'].resetPassword = jest.fn().mockRejectedValueOnce({
      status: 400,
      error: {passwordCompromised: true}
    });
    const data = {
      password: DUMMY_PASSWORD
    };
    await expect(sdk.resetPassword(data)).rejects.toEqual({
      status: 400,
      error: {passwordCompromised: true}
    });
  });
});

describe('mfaRegister()', () => {

  it('should call login API mfaRegister service with correct data', () => {
    const data = {
      countryCode: '+94',
      number: '7348823'
    };
    sdk.mfaRegister(data);
    expect(sdk['loginAPI'].mfaRegister).toHaveBeenCalledWith(data);
  });

  it('should call login API mfaRegister service with correct data', async () => {
    sdk['loginAPI'].mfaRegister = jest.fn().mockResolvedValueOnce({
      message: "operation successful"
    });
    const data = {
      password: DUMMY_PASSWORD
    };
    await expect(sdk.mfaRegister(data)).resolves.toEqual({
      message: "operation successful"
    });
  });

});

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
