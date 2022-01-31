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
const FROM = process.env.FROM;
const TO = process.env.TO;
const ORDERSIZE = process.env.ORDERSIZE;
const SCHEDULE = process.env.SCHEDULE;

async function main(_from, _to, _size) {
    // if all the arguments are met
    if (arguments.length) {
        console.log('===', new Date().toString(), '===')

        // FOR SPOT ORDERS
        const placeOrder = await FTX_INSTANCE.createOTCOrder(_from, _to, _size);

        // FOR LIMIT ORDERS
        // const pair = `${_to}/${_from}`; // this will create the pair BTC/USD for example
        // const priceReq = await FTX_INSTANCE.getPrice(pair);
        // const price = priceReq.price * (95 / 100); // place order 5% under market price
        // const sizeInX = _size / price;  // convert the usd to x
        // const placeOrder = await FTX_INSTANCE.createOrder(sizeInX, pair, "buy", "limit", price);

        if (placeOrder) console.log(placeOrder)
    } else {
        console.error('[x] Please give the correct arguments');
    }
}

cron.schedule(SCHEDULE, () => {
    main(FROM, TO, ORDERSIZE);
});

// for testing purposes
// main(FROM, TO, ORDERSIZE);
