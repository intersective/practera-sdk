# @practera/practera-sdk

This is the sdk of practera. Practera SDK can call different endpoints of API URL passed to the SDK. SDK will always returning promise.

## Install

``` cmd
npm install @practera/practera-sdk
```

## Import

### TypeScript

import the SDK to the TypeScript file that you need to use it.

``` ts
import { PracteraSDK } from '@practera/practera-sdk';
```

initialising `PracteraSDK` object.

```ts
const practeraSDK = new PracteraSDK('apiUrl');
```

| Property name | Description |
| :------------ | :----------- |
| apiUrl | When SDK initialising need to pass the base API URL SDK need call. for ex:- `https://api.test.practera.com/`|

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

### Reset password

Reset password service is calling `/user` endpoint of the API URL passed when SDK init. To call reset password service need to pass user new password and apiKey getting from email link.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   password: '123456',
   apiKey: 'xzcv345'
}

practeraSDK.resetPassword(data).then(
    (response) => {
        console.log('Password change successfull');
    },
    (error) => {
        console.error('error');
    }
);
```

### MFA Register

MFA Register service is calling `/mfa/register` endpoint of the API URL passed when SDK init. To call MFA Register service need to pass country code of the phone number, actual phone number and user apiKey.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   countryCode: '+94',
   number: '123456',
   apiKey: 'xzcv345'
}

practeraSDK.mfaRegister(data).then(
    (response) => {
        console.log('Phone number registration successfull.');
    },
    (error) => {
        console.error('error');
    }
);
```

### MFA Verify

MFA verify service is calling `/mfa/verify` endpoint of the API URL passed when SDK init. To call MFA verify service need to pass verification code and user apiKey.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   code: '123456',
   apiKey: 'xzcv345'
}

practeraSDK.mfaVerify(data).then(
    (response) => {
        console.log('Code verification successfull');
    },
    (error) => {
        console.error('error');
    }
);
```

### MFA SMS

MFA sms service is calling `/mfa/sms` endpoint of the API URL passed when SDK init. To call MFA sms service need to pass user apiKey.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   apiKey: 'xzcv345'
}

practeraSDK.mfaSMS(data).then(
    (response) => {
        console.log('sms send with verification code.');
    },
    (error) => {
        console.error('error');
    }
);
```
