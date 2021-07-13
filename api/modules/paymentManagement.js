const db = require('../models')

const paymentManagement = module.exports = (() => {

    const handleStripeIncomingPayment = async (params) => {
        const {
            amount,
            clientId,
            currency,
            date_paid
        } = params
        const stripe = require('../handlers/stripe')
        const fields = {
            clientId: clientId,
            amount: amount,
            currency: currency
        }
        const newInvoice = await stripe.createInvoice(fields)
        if (date_paid) {
            return stripe.finalizeInvoice({ invoice: newInvoice })
        }
        return newInvoice
    }

    return {
        handleStripeIncomingPayment
    }
})()
