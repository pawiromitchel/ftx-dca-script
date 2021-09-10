# Simple DCA script for FTX

Made with the FTX api to schedule automatic spot conversions

1. clone and install the npm packages
```bash
git clone https://github.com/pawiromitchel/ftx-dca-bot
cd ftx-dca-bot
npm install
```

2. request a API from your [FTX account](https://ftx.com/#a=4341346)
3. create a `.env` file based on the `.env.example`
```
KEY=
SECRET=
SUBACCOUNT=
```

4. modify the parameters in the `app.js`
```js
...
// convert 1 cent to btc
const FROM = 'USD';
const TO = 'BTC';
const ORDERSIZE = 0.01;
...
```