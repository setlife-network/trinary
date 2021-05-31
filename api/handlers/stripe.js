const stripeAPI = require('stripe');
const apiModules = require('../modules');
const {
    STRIPE
} = require('../config/credentials')

const stripe = module.exports = (() => {

    const requestPaymentIntent = (params) => {
        const paymentIntent = new Promise((resolve, reject) => {
            const stripeClient = stripeAPI(STRIPE.API_KEY)
            stripeClient.paymentIntents.create({
                amount: 1000,
                currency: 'usd',
                payment_method_types: ['card'],
                receipt_email: 'test@example.com',
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => reject(new Error(error)))
        })
        return paymentIntent
    }

    const updateClientToStripe = async (params) => {
        console.log('entered on update')
        const stripeClient = stripeAPI(STRIPE.SECRET)
        return await stripeClient.customers.create({
            email: params.createFields.email,
            name: params.createFields.name
        })
    }

    return {
        requestPaymentIntent,
        updateClientToStripe
    }

})();
