import { get, post, put } from '../request';
import Axios from 'axios';

describe('When test get()', (): void => {
  it('should call the correct API', (): void => {
    const endPoint = 'testAPI.com/login';
    spyOn(Axios, 'get').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    get(endPoint);
    expect(Axios.get).toHaveBeenCalledTimes(1);
    expect(Axios.get).toHaveBeenCalledWith(endPoint, {
      timeout: 20000,
      headers: {'Content-Type': 'application/json'},
      params: ''
    });
  });
  it('should call the correct API with correct header and prams', (): void => {
    const endPoint = 'testAPI.com/login';
    const httpOptions = {
      headers : {
        apikey: 'abcd'
      },
      params : {
        domain : 'test.com'
      }
    }
    spyOn(Axios, 'get').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    get(endPoint, httpOptions);
    expect(Axios.get).toHaveBeenCalledTimes(1);
    expect(Axios.get).toHaveBeenCalledWith(endPoint, {
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'abcd'
      },
      params: {
        'domain': 'test.com'
      }
    });
  });
});

describe('When test post()', (): void => {
  it('should call the correct API', (): void => {
    const endPoint = 'testAPI.com/login';
    spyOn(Axios, 'post').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    post(endPoint, {});
    expect(Axios.post).toHaveBeenCalledTimes(1);
    expect(Axios.post).toHaveBeenCalledWith(endPoint, {}, {
      timeout: 20000,
      headers: {'Content-Type': 'application/json'},
      params: ''
    });
  });
  it('should call the correct API with correct header and prams', (): void => {
    const endPoint = 'testAPI.com/login';
    const httpOptions = {
      headers : {
        apikey: 'abcd'
      },
      params : {
        domain : 'test.com'
      }
    }
    const data = {
      userName: 'testUser',
      password: '12345'
    }
    spyOn(Axios, 'post').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    post(endPoint, data, httpOptions);
    expect(Axios.post).toHaveBeenCalledTimes(1);
    expect(Axios.post).toHaveBeenCalledWith(endPoint, data, {
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'abcd'
      },
      params: {
        'domain': 'test.com'
      }
    });
  });
});

describe('When test put()', (): void => {
  it('should call the correct API', (): void => {
    const endPoint = 'testAPI.com/user';
    spyOn(Axios, 'put').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    put(endPoint, {});
    expect(Axios.put).toHaveBeenCalledTimes(1);
    expect(Axios.put).toHaveBeenCalledWith(endPoint, {}, {
      timeout: 20000,
      headers: {'Content-Type': 'application/json'},
      params: ''
    });
  });
  it('should call the correct API with correct header and prams', (): void => {
    const endPoint = 'testAPI.com/user';
    const httpOptions = {
      headers : {
        apikey: 'abcd'
      },
      params : {
        domain : 'test.com'
      }
    }
    const data = {
      password: '12345'
    }
    spyOn(Axios, 'put').and.returnValue(new Promise<void>((resolve, reject) => {
      resolve();
    }));
    put(endPoint, data, httpOptions);
    expect(Axios.put).toHaveBeenCalledTimes(1);
    expect(Axios.put).toHaveBeenCalledWith(endPoint, data, {
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'abcd'
      },
      params: {
        'domain': 'test.com'
      }
    });
  });
});
