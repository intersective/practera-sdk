import { mocked } from 'ts-jest/utils';

import { makePostApiCall } from '../services/request/request-service';
jest.mock('../services/request/request-service');
import { verify, register } from '../services/registration/registration-service';

describe('registration-service', () => {
  const apiurl = 'test.com/';
  const apiKey = 'apiKey';
  const appkey = 'appkey';

  const mockedCall = mocked(makePostApiCall, true);

	describe('verify()', () => {
    it('should verify user registration is valid', () => {
      verify(apiurl, apiKey, appkey, {
        email: 'test@email.com',
        key: 'test'
      });
      expect(mockedCall).toHaveBeenCalledWith("test.com//api/verification_codes.json", {
        "email": "test@email.com",
        "key": "test"
      }, {
        "headers": {
          "apiKey": "apiKey",
          "appkey": "appkey"
        }
      });
    });

    it('should fail if improper parameters provided', () => {
      mockedCall.mockClear();
      const t = () => {
        verify(apiurl, apiKey, appkey, {
          key: 'test',
          email: ''
        });
      };

      expect(t).toThrow('Email & key values must not be empty');
    });
  });

	describe('register()', () => {
		it('should call request service with full url and data', () => {
      const password = 'dummy_sample';
      mockedCall.mockClear();
			register(apiurl, apiKey, appkey, {
        password,
        user_id: 12345,
        key: '12345',
      });
      expect(mockedCall).toHaveBeenCalled();
		});

    it('should fail if improper parameters provided', () => {
      mockedCall.mockClear();
      const t = () => {
        register(apiurl, apiKey, appkey, {
          password: '',
          user_id: 12345,
          key: '12345',
        });
      };

      expect(t).toThrow('Password, user_id & key must not be empty');
    });
	});

});
