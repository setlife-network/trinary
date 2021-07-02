const stripe = require('../handlers/stripe')
const db = require('../models')

const paymentManagement = module.exports = (() => {

    const handleStripeIncomingPayment = async (params) => {
        const fields = {
            clientId: params.clientId,
            amount: params.amount,
            currency: params.currency
        }
        console.log('stripe');
        console.log(stripe);
        return stripe.createInvoice()
    }

    return {
        handleStripeIncomingPayment
    }
})()
