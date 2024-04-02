Paydia SNAP NODE
===============

This is the Official PHP wrapper/library for Paydia SNAP QRIS API, that is compatible with Composer. Visit [https://paydia.id](https://paydia.id) for more information about the product and see documentation at [https://snap-docs.paydia.id](https://snap-docs.paydia.id) for more technical details.

## 1. Installation

### 1.a Manual Instalation

If you are not using Composer, you can clone or [download](https://github.com/Paydia/paydia-snap-node/archive/master.zip) this repository.

Then you should require/autoload `index.js` file on your code.

```javascript
const PaydiaSnap = require('./paydia-snap-node/index.js');

// my code goes here
```

## 2. Getting Started

### 2.1 General Setting

```javascript
    const paydiaSnapClient = new PaydiaSnap({
        production: false, // Set to Enable Sandbox/Production Enviroment. Set to true for Production Environment
        clientId: "<your client id>", // Set your Merchant Client Id
        clientSecret: "<your client secret>", // Set your Merchant Client Secret
        privateKey: "<your private key>" // Set your Merchant Private Key. Private Key in String Format, can use https://www.samltool.com/format_privatekey.php for formatting Private Key as String
    })
```

### 2.2 Request Access Token

```javascript
    // Timestamp in ISO-8601 (Optional Parameter)
    timestamp = '';
    
    // Asynchronous function
    const accessToken = await paydiaSnapClient.Auth.getAccessTokenB2b(timestamp);

    // or

    const accessToken = paydiaSnapClient.Auth.getAccessTokenB2b(timestamp);
    accessToken
    .then((res) => {
        console.log('success_request', res);
    }).catch(err => {
        console.log('error_request', err);
    })
```

### 2.3 Request QRIS MPM

For more information about Request and Response can see documentation at https://snap-docs.paydia.id/snap-service/qris-mpm-acquirer/.

```javascript

    // Access Token from Access Token B2B
    token = '';
    // Request Generate QR MPM, see documentation for detail request
    request = array(
        ...
    );
    // External Id Request (Optional Parameter)
    externalId = '';
    // Timestamp in ISO-8601 (Optional Parameter)
    timestamp = '';

    // Request Generate QR MPM
    // Asynchronous function
    const generateQr = paydiaSnapClient.Mpm.generateQr(token, request, externalId, timestamp)

    // Request Status Inquiry
    // Asynchronous function
    const checkStatus = paydiaSnapClient.Mpm.checkStatusQr(token, request, externalId, timestamp)
```
