const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const db = require('../models')
const apiModules = require('../modules')

const stripeHandler = module.exports = (() => {
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

    const createInvoice = async ({
        amount,
        clientId,
        currency,
        external_uuid
    }) => {
        const client = await apiModules.clientManagement.findClientWithId(clientId)
        const invoiceItem = await stripeClient.invoiceItems.create({
            customer: client.external_uuid,
            currency: currency,
            price_data: {
                currency: currency,
                product: 'prod_JJXofAMeGR4HIS',
                unit_amount: amount
            }
        })
        return stripeClient.invoices.create({
            customer: client.external_uuid,
            description: 'payment charged from trinary'
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
        createInvoice,
        pushUpdatedClient
    }

})();
