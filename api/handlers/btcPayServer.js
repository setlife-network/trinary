const axios = require('axios')
const {
    BTCPAYSERVER
} = require('../config/credentials')
const { BTCPAYSERVER_API_ROOT } = require('../config/constants')
const crypto = require('crypto')

const BTCPAYSERVER_API_KEY = BTCPAYSERVER.API_KEY;
const BTCPAYSERVER_STORE_ID = BTCPAYSERVER.STORE_ID;
const BTCPAYSERVER_SECRET = BTCPAYSERVER.SECRET;

let config = {
    headers: {
        Authorization: 'token ' + BTCPAYSERVER_API_KEY
    }
}

const createBitcoinInvoice = async (amount) => {
    const body = {
        metadata: {
            orderId: '',
            orderUrl: '' 
        },
        checkout: {
            speedPolicy: 'HighSpeed',
            paymentMethods: [
                'BTC', 'BTC-LightningNetwork'
            ],
            defaultPaymentMethod: 'BTC-LightningNetwork',
            expirationMinutes: 24 * 60,
            monitoringMinutes: 5,
            paymentTolerance: 100,
        },
        amount: amount,
        currency: 'sats',
        additionalSearchTerms: [
            'string'
        ]
    }
    const response = await axios.post(
        `${BTCPAYSERVER_API_ROOT}/stores/${BTCPAYSERVER_STORE_ID}/invoices`, 
        body, 
        config
    )
    
    return response.data
}

const getAllInvoices = async () => {
    const response = await axios.get(
        `${BTCPAYSERVER_API_ROOT}/stores/${BTCPAYSERVER_STORE_ID}/invoices`, 
        config
    )

    return response.data
}

const getInvoiceById = async (invoiceId) => {
    const response = await axios.get(
        `${BTCPAYSERVER_API_ROOT}/stores/${BTCPAYSERVER_STORE_ID}/invoices/${invoiceId}`, 
        config
    )

    return response.data
}

const webhookSignatureIsValid = (body, signature) => {
    const expectedSignature = 'sha256=' + crypto.createHmac(
        'sha256', 
        Buffer.from(BTCPAYSERVER_SECRET)
    )
        .update(JSON.stringify(body, null, 2))
        .digest('hex')
    if (signature === expectedSignature) return true
    return false
}

module.exports = { 
    createBitcoinInvoice, 
    getAllInvoices, 
    getInvoiceById,
    webhookSignatureIsValid
};