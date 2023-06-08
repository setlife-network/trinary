const axios = require('axios')

const sendPayment = async (host, port, macaroon, payment_request) => {
    const options = {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        headers: {
            'Grpc-Metadata-macaroon': macaroon,
        }
    }
    
    const body = {
        payment_request: payment_request
    }

    response = await axios.post(
        `https://${host}:${port}/v1/channels/transactions`,
        body, 
        options
    )

    return response.data
}

const addInvoice = async (host, port, macaroon, value) => {
    const options = {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        headers: {
            'Grpc-Metadata-macaroon': macaroon,
        }
    }

    const body = {
        value: value,
    }

    response = await axios.post(
        `https://${host}:${port}/v1/invoices`,
        body,
        options
    )

    return response.data
}

const decodePaymentRequest = async (host, port, macaroon, payment_request) => {
    const options = {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        headers: {
            'Grpc-Metadata-macaroon': macaroon,
        }
    }

    response = await axios.get(
        `https://${host}:${port}/v1/payreq/${payment_request}`,
        options
    )

    return response.data
}

const listPayments = async (host, port, macaroon) => {
    const options = {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        headers: {
            'Grpc-Metadata-macaroon': macaroon,
        }
    }

    response = await axios.get(
        `https://${host}:${port}/v1/payments`,
        options
    )

    return response.data
}

module.exports = {
    sendPayment,
    addInvoice,
    decodePaymentRequest,
    listPayments
}