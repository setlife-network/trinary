const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createClient = async (params) => {
        const client = await findClientWithEmail(params.createFields)
        if (!client.external_uuid) {
            return await stripeClient.customers.create({
                email: params.createFields.email,
                name: params.createFields.name,
            })
        }
    }

    const findClientWithEmail = async (params) => {
        return await db.models.Client.findOne({
            where: {
                email: params.email
            }
        })
    }

    const pushUpdatedClient = async (params) => {
        const client = await findClientWithEmail(params.updateFields)
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
        createClient,
        pushUpdatedClient
    }

})();
