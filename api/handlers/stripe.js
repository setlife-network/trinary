const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')
const apiModules = require('../modules')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createCustomer = async (params) => {
        const client = await apiModules.clientManagement.findClientWithEmail(params.createFields)
        if (!client.external_uuid) {
            return stripeClient.customers.create({
                email: params.createFields.email,
                name: params.createFields.name,
            })
        }
    }

    const checkCredentials = async () => {
        if (!STRIPE.SECRET || !STRIPE.API_KEY) {
            return false
        } else return stripeClient ? true : false;
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
        checkCredentials,
        pushUpdatedClient
    }

})();
