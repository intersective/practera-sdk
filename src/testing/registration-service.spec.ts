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
      expect(mockedCall).toHaveBeenCalled();
    });
  });

	describe('register()', () => {
		it('should call request service with full url and data', () => {
			register(apiurl, apiKey, appkey, {
        password: 'weakpassword',
        user_id: 12345,
        key: '12345',
      });
      expect(mockedCall).toHaveBeenCalled();
		});
	});

});
