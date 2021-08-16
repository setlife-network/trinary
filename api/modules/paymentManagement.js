const db = require('../models')

const paymentManagement = module.exports = (() => {

    const processStripeInvoiceWithPayment = async (params) => {
        const stripe = require('../handlers/stripe')
        const {
            amount,
            clientId,
            currency,
            date_paid
        } = params
        
        const actualCurrency = 
            currency == 'USD' 
                ? currency
                : 'USD'

        const createdInvoice = await stripe.createInvoice({
            clientId,
            amount,
            actualCurrency
        })

        if (date_paid) {
            return stripe.finalizeInvoice({ invoice: createdInvoice })
        }

        return createdInvoice
    }

    return {
        processStripeInvoiceWithPayment
    }
})()
