const stripeAPI = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const stripe = module.exports = (() => {

    const requestPaymentIntent = (params) => {
        const paymentIntent = new Promise((resolve, reject) => {
            stripeAPI.paymentIntents.create({
                amount: 1000,
                currency: 'usd',
                payment_method_types: ['card'],
                receipt_email: 'jenny.rosen@example.com',
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
