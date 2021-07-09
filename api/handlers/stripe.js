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
                product: 'prod_JJXofAMeGR4HIS',
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
        createInvoice,
        finalizeInvoice,
        pushUpdatedClient
    }

})();
