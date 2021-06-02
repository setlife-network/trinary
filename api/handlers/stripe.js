const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')

const stripe = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.API_KEY)

    const pushUpdatedClient = async (params) => {
        const client = db.models.Client.findOne({
            where: {
                id: params.updatedFields.id
            }
        })
        const stripe_uuid = client.external_uuid
        if (stripe_uuid) {
            return await stripeClient.customer.update({
                stripe_uuid,
                name: client.name,
                email: client.email
            })
        }
    }

    return {
        pushUpdatedClient
    }

})();
