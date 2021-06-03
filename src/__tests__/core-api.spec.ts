import { mocked } from 'ts-jest/utils';
import { DUMMY_PASSWORD } from './mock-data';

import { post, get } from '../request';
jest.mock('../request');
import { verify, register, getConfig } from '../data-sources/core-api';

describe('registration-service', () => {
  const apiurl = 'test.com/';
  const apiKey = 'apiKey';
  const appkey = 'appkey';

  const mockedCall = mocked(post, true);

	describe('verify()', () => {
    it('should verify user registration is valid', () => {
      verify(apiurl, apiKey, appkey, {
        email: 'test@email.com',
        key: 'test'
      });
      expect(mockedCall).toHaveBeenCalledWith("https://test.com/api/verification_codes.json", {
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
      mockedCall.mockClear();
			register(apiurl, apiKey, appkey, {
        password: DUMMY_PASSWORD,
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

describe('When testing getConfig()', () => {
  const API_URL = 'testAPI.com/';
  const mockedCall = mocked(get, true);

  it('should throw error if domain is empty', async () => {
    mockedCall.mockClear();
    const data = {
      domain: '',
    };
    const call = () => {
      getConfig(API_URL, data);
    };
    expect(call).toThrow('Tech Error: Domain is compulsory!');
  });

  it('should call experience list service with full API URL and data', () => {
    mockedCall.mockClear();
    const data = {
      domain: 'https://app.practera.com',
    };
    getConfig(API_URL, data);
    expect(mockedCall).toHaveBeenCalledWith('https://testAPI.com/api/v2/plan/experience/list', {
      params: data
    });
  });
});
