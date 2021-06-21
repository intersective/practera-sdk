# @practera/practera-sdk

This is the sdk of practera. Practera SDK can call different endpoints of API URL passed to the SDK. SDK will return promise as it's return value.

## Health

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=alert_status&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=coverage&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=security_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=sqale_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=bugs&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=intersective_practera-sdk&metric=code_smells&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_practera-sdk)

## Table of Contents

- [Install](#install)
- [Import](#import)
    - [TypeScript](#typescript)
- [Config Parameters](#config-parameters)
- [Public Methods](#public-methods)
  - [useConstructorParams](#useconstructorparams)
- [API Calls](#api-calls)
    - [Login](#login)
    - [Forgot password](#forgot-password)
    - [Direct login](#direct-login)
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

Import the SDK to the TypeScript file that you need to use it.

``` ts
import { PracteraSDK } from '@practera/practera-sdk';
```

Initialising `PracteraSDK` object.

```ts
const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login.api.com',
  coreApiUrl: 'core.api.com',
  loginAppUrl: 'login.app.com',
  apiKey: 'apiKey',
});
```

| Property name | Description |
| :----------------- | :----------------------------------------------- |
| loginApiUrl        | Need to provide Login Api Url when SDK initialising to make API calls to it. `not required` |
| coreApiUrl         | Need to provide Core Api Url when SDK initialising to make API calls to it. `not required` |
| loginAppUrl        | Need to provide Global Login App Url when SDK initialising to make API calls to it. `not required` |
| apiKey             | Need to provide Apikey when SDK rely on apikey for API calls. `not required` |

## Config Parameters

Config parameters you need to provide depends on which API call you going to make through practera SDK.

```ts
const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login.api.com',
  coreApiUrl: 'core.api.com',
  loginAppUrl: 'login.app.com',
  apiKey: 'apiKey',
});
```
```ts
const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login.api.com'
});
```
```ts
const practeraSDK = new PracteraSDK({
  coreApiUrl: 'core.api.com',
  apiKey: 'apiKey',
});
```
```ts
const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login.api.com',
  loginAppUrl: 'login.app.com',
  apiKey: 'apiKey',
});
```

If you need to update config params after initialise Practera SDK, can use public method [useConstructorParams](#useconstructorparams)

## Public Methods

Public methods are the methods that's not calling any API cals and you can call to do different things.

### useConstructorParams()

By using this method we can update config parameters passed when SDK initialisation.

```ts
const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login.api.com'
});

practeraSDK.useConstructorParams({
  coreApiUrl: 'core.api.com',
  apiKey: 'apiKey',
});

practeraSDK.useConstructorParams({
  loginApiUrl: 'login-02.api.com',
  loginAppUrl: 'login.app.com',
  apiKey: 'apiKey-02',
});
```

## API Calls

These are the API calls can make through Preactera SDK. Each API call reuire different config parameters when SDK initialisation. Before you make any API call make sure you provided correct config parameters when SDK initialise.
**Check [Config Parameters](#config-parameters) for examples about how we can use them.**

### Login

Login service is calling `/login` endpoint of the API URL passed when SDK init. 
To call login service need to pass user credentials. Credentials contains two data. username, email address of user and password.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url'
});

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

### Direct login

Login service is calling `/login` endpoint of the API URL passed when SDK init. 
To call login service as direct login need to pass apikey to the API.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url'
});

let data = {
   apikey: 'sample-apikey',
}

practeraSDK.directLogin(data).then(
    (response) => {
        console.log('login success');
    },
    (error) => {
        console.error('error');
    }
);
```

### Forgot password

Forgot password service is calling `/forgotPassword` endpoint of the API URL passed when SDK init. 
To call forgot password service need to pass user registerd email. Email use to send password reset email to the user.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url',
  loginAppUrl: 'global login app url'
});

let data = {
   email: 'abcd@gmail.com'
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

Reset password service is calling `/user` endpoint of the API URL passed when SDK init. 
To call reset password service need to pass user new password and apiKey getting from email link.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url',
  apiKey: '12345'
});

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

const practeraSDK = new PracteraSDK({
  coreApiUrl: 'core api url',
  apiKey: '12345'
});

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

const practeraSDK = new PracteraSDK({
  coreApiUrl: 'core api url',
  apiKey: '12345'
});

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

MFA Register service is calling `/mfa/register` endpoint of the API URL passed when SDK init. 
To call MFA Register service need to pass country code of the phone number, actual phone number and user apiKey.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url',
  apiKey: '12345'
});

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

MFA verify service is calling `/mfa/verify` endpoint of the API URL passed when SDK init. 
To call MFA verify service need to pass verification code and user apiKey.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url',
  apiKey: '12345'
});

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

const practeraSDK = new PracteraSDK({
  loginApiUrl: 'login api url',
  apiKey: '12345'
});

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

Get custom config service is calling `/api/v2/plan/experience/list` endpoint of the API URL passed when SDK init. 
To call Get custom config service need to pass domain.

```ts
import { PracteraSDK } from '@practera/practera-sdk';

const practeraSDK = new PracteraSDK({
  coreApiUrl: 'core api url'
});

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
