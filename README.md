# @practera/practera-sdk

This is the sdk of practera. Practera SDK can call different endpoints of API URL passed to the SDK. SDK will always returning promise.

## Health

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=alert_status&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=coverage&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=security_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=sqale_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=bugs&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=code_smells&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk)

## Table of Contents

- [Install](#install)
- [Import](#import)
    - [TypeScript](#typescript)
- [Servicers](#servicers)
    - [Login](#login)
    - [Forgot password](#forgot-password)
    - [Reset password](#reset-password)
    - [Account Registration/Activation](#account-registrationactivation)
    - [Account Registration Verification](#account-registration-verification)
    - [MFA Register](#mfa-register)
    - [MFA Verify](#mfa-verify)
    - [MFA SMS](#mfa-sms)
    - [Get Custom Config](#get-custom-config)

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
// or
const practeraSDK = new PracteraSDK('apiUrl', 'apikey'); // when SDK rely on apikey for API calls
```

| Property name | Description |
| :------------ | :----------------------------------------------------------------------------------------------------------- |
| apiUrl        | When SDK initialising need to pass the base API URL SDK need call. for ex:- `https://api.test.practera.com/` |

## Servicers

### Login

Login service is calling `/login` endpoint of the API URL passed when SDK init. To call login service need to pass user credentials. Credentials contains two data. username, email address of user and password.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let credentials = {
   username: 'abcd@gmail.com',
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

const practeraSDK = new PracteraSDK('apiUrl', 'apikey');

let data = {
   password: '123456'
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

### Account Registration/Activation

User account registration/activation uses `/registration_details` endpoint.
Purpose: Activate/register user account with user-specified password.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl', 'apikey');

let data = {
  appkey: 'sample-appkey',
  password: 'sample-password',
  user_id: 12345,
  key: 'sample-key',
};

practeraSDK.register(data).then(
    (response) => {
        console.log('Registration successful.');
    },
    (error) => {
        console.error('error');
    }
);
```

### Account Registration Verification

User account registration verification uses `/verification_codes` endpoint.
Purpose: verify current user registration session

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl', 'apikey');

let data = {
  appkey: 'sample-appkey',
  email: 'sample-email',
  key: 'sample-key',
};

practeraSDK.verifyRegistration(data).then(
    (response) => {
        console.log('Registration session is valid.');
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

const practeraSDK = new PracteraSDK('apiUrl', 'apikey');

let data = {
   countryCode: '+94',
   number: '123456'
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

const practeraSDK = new PracteraSDK('apiUrl', 'apikey');

let data = {
   code: '123456'
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

const practeraSDK = new PracteraSDK('apiUrl', 'apiKey');

practeraSDK.mfaSMS().then(
    (response) => {
        console.log('sms send with verification code.');
    },
    (error) => {
        console.error('error');
    }
);
```

### Get Custom Config

Get custom config service is calling `/api/v2/plan/experience/list` endpoint of the API URL passed when SDK init. To call Get custom config service need to pass domain.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK('apiUrl');

let data = {
   domain: 'https://app.practera.com'
}

practeraSDK.getCustomConfig(data).then(
    (response) => {
        console.log('returning experience config');
    },
    (error) => {
        console.error('error');
    }
);
```
