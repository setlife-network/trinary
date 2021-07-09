const db = require('../models')

const paymentManagement = module.exports = (() => {

    const handleStripeIncomingPayment = async (params) => {
        const stripe = require('../handlers/stripe')
        const fields = {
            clientId: params.clientId,
            amount: params.amount,
            currency: params.currency
        }
        return stripe.createInvoice(fields)
    }

    return {
        handleStripeIncomingPayment
    }
})()
