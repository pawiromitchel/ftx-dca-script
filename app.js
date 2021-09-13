require("dotenv").config();
const cron = require('node-cron');
const FTX = require('ftx-api-rest-extended');

const creds = {
    'key': process.env.KEY,
    'secret': process.env.SECRET,
    'subaccount': process.env.SUBACCOUNT
}

const FTX_INSTANCE = new FTX(creds);

// convert 1 cent to btc
const FROM = 'USD';
const TO = 'BTC';
const ORDERSIZE = 0.01;

// run the script every wednesday
// https://crontab.guru/
const SCHEDULE = '0 0 * * 2';

async function main(_from, _to, _size) {
    // if all the arguments are met
    if (arguments.length) {
        console.log('===', new Date().toString(), '===')
        const convert = await FTX_INSTANCE.createOTCOrder(_from, _to, _size);
        if (convert) console.log(convert)
    } else {
        console.error('[x] Please give the correct arguments');
    }
}

cron.schedule(SCHEDULE, () => {
    main(FROM, TO, ORDERSIZE);
});

// for testing purposes
// main(FROM, TO, ORDERSIZE);