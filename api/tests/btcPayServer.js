require('dotenv').config({ path: __dirname + '/../../.env' });
const axios = require('axios')

const BTCPayServerAPIKey = process.env.BTCPAYSERVER_API_KEY;
const BTCPayServerStoreId = process.env.BTCPAYSERVER_STORE_ID;

let config = {
    headers: {
        Authorization: 'token ' + BTCPayServerAPIKey
    }
}

const checkInvoiceExpired = async (invoiceId) => {
    const invoice = await getInvoiceById(invoiceId)
    if (invoice.status === 'Expired') console.log(true)
    else console.log(false)
}

const createBitcoinInvoice = (amount) => {
    const body = {
        'metadata': {
            'orderId': 'string 123',
            'orderUrl': 'string'
        },
        'checkout': {
            'speedPolicy': 'HighSpeed',
            'paymentMethods': [
                'BTC', 'BTC-LightningNetwork'
            ],
            'defaultPaymentMethod': 'BTC-LightningNetwork',
            'expirationMinutes': 60 * 24,
            'monitoringMinutes': 5,
            'paymentTolerance': 100,
        },
        'amount': amount,
        'currency': 'sats',
        'additionalSearchTerms': [
            'string'
        ]
    }
    return axios.post(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices`, body, config).then(res => console.log(res.data));
}

const getAllInvoices = () => {
    axios.get(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices`, config).then(res => console.log(res.data));
}

const getInvoiceById = (invoiceId) => {
    return axios.get(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices/${invoiceId}`, config).then(res => res.data);
}

const getCheckoutUrl = async (invoiceId) => {
    const invoice = await getInvoiceById(invoiceId);
    console.log(invoice.checkoutLink)
}
getCheckoutUrl('5BtRCbD7e1DkW5jHFUhgBn')
module.exports = createBitcoinInvoice;