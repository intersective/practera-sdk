# @practera/practera-sdk

This is the sdk of practera. Practera SDK can call different endpoints of API URL passed to the SDK. SDK will always returning promise.

## Install

``` cmd
npm install @practera/practera-sdk
```

## Import

### TypeScript

import the component in the module file that you need to use it.

``` ts
import { PracteraSDK } from '@practera/practera-sdk';
```

initialising `PracteraSDK` object.

```ts
const practeraSDK = new PracteraSDK('apiUrl');
```

| Property name | Description |
| :------------ | :----------- |
| apiUrl | When SDK initialising need to pass the base API URL SDK need call. for ex:- `https://api.test.practera.com`|

## servicers

### Login

Login service is calling `/login` endpoint of the API URL passed when SDK init. To call login service need to pass user credentials. Credentials contains two data, user email address and password.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let credentials = {
   email: 'abcd@gmail.com',
   password: '1234'
}

practeraSDK.login(credentials).then(
    (response) => {
        console.log('login success');
    },
    (error) => {
        console.error('error');
    }
);
```

### Forgot password

Forgot password service is calling `/forgotPassword` endpoint of the API URL passed when SDK init. To call forgot password service need to pass user registerd email and global login URL.

Email use to send password reset email to the user and global login URL use to create direct link and reset link to navigate user to global login to reset user password.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   email: 'abcd@gmail.com',
   globalLoginUrl: 'https://login.practera.com'
}

practeraSDK.forgotpassword(data).then(
    (response) => {
        console.log('Password reset email send to provided email');
    },
    (error) => {
        console.error('error');
    }
);
```
