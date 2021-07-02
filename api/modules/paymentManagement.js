const db = require('../models')

const stripe = require('../handlers/stripe')

const paymentManagement = module.exports = (() => {

    const handleStripeIncomingPayment = async (params) => {
        // const fields = {
        //     clientId: params.clientId,
        //     amount: params.amount,
        //     currency: params.currency
        // }
        console.log('params');
        console.log(params);
        console.log('stripe');
        console.log(stripe);
        // console.log('fields');
        // console.log(fields);
        return stripe.createInvoice()
    }

    return {
        handleStripeIncomingPayment
    }
})()
