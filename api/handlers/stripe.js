const stripeAPI = require('stripe');

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

    return {
        requestPaymentIntent
    }

})();
