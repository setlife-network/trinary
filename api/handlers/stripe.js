const stripeAPI = require('stripe');
const apiModules = require('../modules');
const {
    STRIPE
} = require('../config/credentials')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const updateClientToStripe = async (params) => {
        return await stripeClient.customers.create({
            email: params.createFields.email,
            name: params.createFields.name,
        })
    }

    return {
        updateClientToStripe
    }

})();
