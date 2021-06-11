const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createClient = async (params) => {
        const client = db.models.Client.findOne({
            where: {
                email: params.createFields.email
            }
        })
        if (!client.external_uuid) {
            return stripeClient.customers.create({
                email: params.createFields.email,
                name: params.createFields.name,
            })
        }
    }

    return {
        createClient
    }

})();
