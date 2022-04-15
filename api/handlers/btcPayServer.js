const axios = require('axios')
const {
    BTCPAYSERVER
} = require('../config/credentials')

const BTCPayServerAPIKey = BTCPAYSERVER.API_KEY;
const BTCPayServerStoreId = BTCPAYSERVER.STORE_ID;

let config = {
    headers: {
        Authorization: 'token ' + BTCPayServerAPIKey
    }
}

const checkInvoiceExpired = async (invoiceId) => {
    const invoice = await getInvoiceById(invoiceId)
    if (invoice.status === 'Expired') return true
    return false
}

const createBitcoinInvoice = (amount) => {
    const body = {
        'metadata': {
            'orderId': 'string',
            'orderUrl': 'string'
        },
        'checkout': {
            'speedPolicy': 'HighSpeed',
            'paymentMethods': [
                'BTC', 'BTC-LightningNetwork'
            ],
            'defaultPaymentMethod': 'BTC-LightningNetwork',
            'expirationMinutes': 5,
            'monitoringMinutes': 5,
            'paymentTolerance': 100,
        },
        'amount': amount,
        'currency': 'sats',
        'additionalSearchTerms': [
            'string'
        ]
    }
    return axios.post(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices`, body, config).then(res => res.data);
}

const getAllInvoices = () => {
    axios.get(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices`, config).then(res => res.data);
}

const getInvoiceById = (invoiceId) => {
    return axios.get(`https://btcpayserver.setlife.tech/api/v1/stores/${BTCPayServerStoreId}/invoices/${invoiceId}`, config).then(res => res.data);
}

module.exports = { checkInvoiceExpired, createBitcoinInvoice, getAllInvoices, getInvoiceById };