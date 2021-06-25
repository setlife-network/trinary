const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')
const apiModules = require('../modules')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createCustomer = async (params) => {
        const { email, name } = params

        stripeClient.customers.create({
            email,
            name,
        })
    }

    const pushUpdatedClient = async (params) => {
        const client = await findClientWithEmail(params.updateFields)
        const stripe_uuid = client.external_uuid
        if (stripe_uuid) {
            return stripeClient.customers.update(
                stripe_uuid, 
                {
                    name: client.name,
                    email: client.email
                }
            )
        }
    }

    return {
        createCustomer,
        pushUpdatedClient
    }

})();
