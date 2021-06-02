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
        if (client.external_uuid) {
            return await stripeClient.customer.update({

            })
        }
    }

    return {
        pushUpdatedClient
    }

})();
