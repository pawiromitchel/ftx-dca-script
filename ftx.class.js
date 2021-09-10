const FTXRest = require('ftx-api-rest');

class FTXService {
    constructor(creds) {
        this.FTXConnection = new FTXRest(creds);
    }

    /**
     * Get the price of an future or spot asset
     * @param {string} _pair BTC-PERP or BTC/USD
     * @returns
     */
    async getPrice(_pair) {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/markets/' + _pair
            });
            const res = await req;
            return await res;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Convert X to Y
     * @param {string} _from Asset you want to convert
     * @param {string} _to Asset you want to convert to
     * @param {number} _size How much you want to convert
     * @returns 
     */
    async convert(_from, _to, _size) {
        try {
            const req = this.FTXConnection.request({
                method: 'POST',
                path: '/otc/quotes',
                data: {
                    "fromCoin": _from,
                    "toCoin": _to,
                    "size": _size
                }
            });
            const res = await req;
            return await res;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Get information about the swap you want to do
     * @param {number} _id QuoteID of the order
     * @returns 
     */
    async getQuoteInfo(_id) {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/otc/quotes/' + _id
            });
            const res = await req;
            return await res;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Accept the order
     * @param {number} _id QuoteID of the order
     * @returns 
     */
    async acceptQuote(_id) {
        try {
            const req = this.FTXConnection.request({
                method: 'POST',
                path: `/otc/quotes/${_id}/accept`
            });
            const res = await req;
            return await res;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }
}

module.exports = FTXService;