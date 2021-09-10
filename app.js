require("dotenv").config();
const cron = require('node-cron');
const FTX = require('./ftx.class');

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
        console.log('[i] Script ran at: ', new Date().toString())
        // get the exchange rate of the swap you want to do
        const getPrice = await FTX_INSTANCE.getPrice(`${_to}/${_from}`);
        if (getPrice) {
            const { price, quoteCurrency } = getPrice.result;
            console.log(`[i] Exchange rate: ${price} ${quoteCurrency}`);
        }
        // set up the conversion
        const convert = await FTX_INSTANCE.convert(_from, _to, _size);
        if (convert) {
            const { quoteId } = convert.result;
            if (quoteId) {
                console.log(`[i] QuoteId: ${quoteId}`);
                // get the information about the conversion you are about to do
                const info = await FTX_INSTANCE.getQuoteInfo(quoteId);
                const { fromCoin, toCoin, proceeds } = info.result;
                // accept the conversion
                const acceptOrder = await FTX_INSTANCE.acceptQuote(quoteId);
                const { success } = acceptOrder;
                if (success) {
                    console.log(`[i] Converted ${_size} ${fromCoin} to ${proceeds.toFixed(8)} ${toCoin}`);
                } else {
                    console.error('[x] Did not accept the QuoteID');
                }
            } else {
                console.error('[x] Did not receive a quote ID');
            }
        } else {
            console.error('[x] Failed to convert');
        }
    } else {
        console.error('[x] Please give the correct arguments');
    }
}

cron.schedule(SCHEDULE, () => {
    main(FROM, TO, ORDERSIZE);
});

// for testing purposes
// main(FROM, TO, ORDERSIZE);