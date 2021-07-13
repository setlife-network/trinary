const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const {
    STRIPE_PRODUCT_PLACEHOLDER_ID
} = require('../config/constants')
const db = require('../models')
const apiModules = require('../modules')

const stripeHandler = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createCustomer = async (params) => {
        const { email, name } = params

        stripeClient.customers.create({
            email,
            name,
        })
    }

    const checkCredentials = async () => {
        if (!STRIPE.SECRET || !STRIPE.API_KEY) {
            return false
        } else {
            try {
                await stripeClient.events.list({
                    limit: 1,
                });

                return true
            } catch {
                return false
            }
        }
    }

    const createInvoice = async (params) => {
        const {
            amount,
            clientId,
            currency,
            external_uuid
        } = params
        const client = await apiModules.clientManagement.findClientWithId(clientId)
        const invoiceItemProps = {
            customer: client.external_uuid,
            currency: currency,
            price_data: {
                currency: currency,
                product: STRIPE_PRODUCT_PLACEHOLDER_ID,
                unit_amount: amount
            }
        }
        const invoiceProps = {
            collection_method: 'charge_automatically',
            customer: client.external_uuid,
            description: 'payment charged from trinary'
        }
        const invoiceItem = await stripeClient.invoiceItems.create(invoiceItemProps)
        return stripeClient.invoices.create(invoiceProps)
    }

    const finalizeInvoice = async (params) => {
        const {
            invoice
        } = params
        return stripeClient.invoices.finalizeInvoice(invoice.id)
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
        createInvoice,
        finalizeInvoice,
        pushUpdatedClient
    }

})();
