const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const pushUpdatedClient = async (params) => {
        const client = await db.models.Client.findOne({
            where: {
                email: params.updateFields.email
            }
        })
        const stripe_uuid = client.external_uuid
        if (stripe_uuid) {
            return await stripeClient.customers.update(
                stripe_uuid, {
                name: client.name,
                email: client.email
            })
        }
    }

    return {
        pushUpdatedClient
    }

})();
