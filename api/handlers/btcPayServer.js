const axios = require('axios')
const {
    BTCPAYSERVER
} = require('../config/credentials')
const crypto = require('crypto')

const BTCPAYSERVER_API_KEY = BTCPAYSERVER.API_KEY
const BTCPAYSERVER_API_ROOT = BTCPAYSERVER.API_ROOT
const BTCPAYSERVER_STORE_ID = BTCPAYSERVER.STORE_ID
const BTCPAYSERVER_SECRET = BTCPAYSERVER.SECRET
const BTCPAYSERVER_WALLET_ID = BTCPAYSERVER.WALLET_ID

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

const getNodeInfo = async () => {
    const response = await axios.get(
        `${BTCPAYSERVER_API_ROOT}/server/lightning/BTC/info`, 
        config
    )

    return response.data
}

const getFee = async () => {
    const response = await axios.get(
        `${BTCPAYSERVER_API_ROOT}/stores/${BTCPAYSERVER_STORE_ID}/payment-methods/onchain/BTC/wallet/feerate`, 
        config
    )

    return response.data
}

const createOnChainTransaction = async (walletAddress, amount) => {
    const fee = await getFee()
    const body = {
        destinations: [
            {
                destination: walletAddress,
                amount: amount,
            }
        ],
        feerate: fee.feeRate,
        proceedWithPayjoin: true,
        proceedWithBroadcast: true,
        noChange: false,
        rbf: true,
        excludeUnconfirmed: false,
    }
    const response = await axios.post(
        `${BTCPAYSERVER_API_ROOT}/stores/${BTCPAYSERVER_STORE_ID}/payment-methods/onchain/BTC/wallet/transactions`,
        body, 
        config
    )
    
    return response.data
}

// This function depends on a BTCPAYSERVER_WALLET_ID which is a LNBank
// wallet set up within the BTCPS dashboard (plugin required) and is meant
// to serve as a partitioned source wallet so that you don't have to grant
// full canuseinternallightningnode permissions to this app
// any payment_request passed to this function will be paid from the funds
// in that LN Bank Wallet
const payLightningInvoice = async (payment_request) => {
    const body = {
        destination: payment_request
    }
    const response = await axios.post(
        `${BTCPAYSERVER_API_ROOT}/lnbank/wallets/${BTCPAYSERVER_WALLET_ID}/send`,
        body, 
        config
    )

    return response.data
}

module.exports = { 
    createBitcoinInvoice, 
    getAllInvoices, 
    getInvoiceById,
    webhookSignatureIsValid,
    getNodeInfo,
    createOnChainTransaction,
    getFee,
    payLightningInvoice
};
