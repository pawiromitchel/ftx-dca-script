# Simple DCA script for FTX
A simple script to automate the buying or selling process.    
Just run the script on your desired server and forget about it 💤

## Made with
- [ftx-api-rest-extended](https://www.npmjs.com/package/ftx-api-rest-extended), for interacting with the FTX Exchange
- [node-cron](https://www.npmjs.com/package/node-cron), for the scheduler
- [dotenv](https://www.npmjs.com/package/dotenv), for parsing the configurations within .env file

## Installing
1. clone and install the npm packages
```bash
git clone https://github.com/pawiromitchel/ftx-dca-bot
cd ftx-dca-bot
npm install
```

2. request a API from your [FTX account](https://ftx.com/#a=4341346)
3. create a `.env` file based on the `.env.example`
4. modify the parameters in the `app.js`

*This example will convert 100 USD into BTC every Tuesday*
```bash
# ftx api creds
KEY=key1
SECRET=secret1
SUBACCOUNT=subaccount1

# settings 
FROM=USD
TO=BTC
ORDERSIZE=100

# cron schedule (https://crontab.guru/examples.html)
SCHEDULE=0 0 * * 2
```
5. run the script
```bash
node app.js
```

*Cron syntax cheatsheet*
<img src="https://i.stack.imgur.com/89z4w.png">
