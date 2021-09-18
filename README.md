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