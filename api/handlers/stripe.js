const stripeAPI = require('stripe');

const {
    STRIPE
} = require('../config/credentials')
const {
    STRIPE_PRODUCT_PLACEHOLDER_ID
} = require('../config/constants')

const stripeHandler = module.exports = (() => {
    const stripeClient = stripeAPI(STRIPE.SECRET)

    const createCustomer = async (params) => {
        const { email, name } = params

        return stripeClient.customers.create({
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
        const clientManagement = require('../modules/clientManagement')

        const {
            amount,
            clientId,
            actualCurrency,
            external_uuid
        } = params

        let clientExternalUuid = external_uuid
        if (!external_uuid) {
            const client = await clientManagement.findClientWithId(clientId)
            clientExternalUuid = client.external_uuid;
        }

        const invoiceItemProps = {
            customer: clientExternalUuid,
            currency: actualCurrency,
            price_data: {
                currency: actualCurrency,
                product: STRIPE_PRODUCT_PLACEHOLDER_ID,
                unit_amount: amount
            }
        }
        const invoiceProps = {
            collection_method: 'charge_automatically',
            customer: clientExternalUuid,
            description: 'payment charged from trinary'
        }
        try {
            const invoiceItem = await stripeClient.invoiceItems.create(invoiceItemProps)
            return stripeClient.invoices.create(invoiceProps)
        } catch (err) {
            console.log('An error ocurred: ', err)
        }

    }

    const finalizeInvoice = async (params) => {
        const {
            invoice
        } = params
        return stripeClient.invoices.finalizeInvoice(invoice.id)
    }

    const listAllCustomers = async () => {
        return stripeClient.customers.list({
            limit: 100,
        });
    }

    const updateCustomerWithClientId = async (params) => {
        const clientManagement = require('../modules/clientManagement')
        const { clientId } = params

        const client = await clientManagement.findClientWithId(clientId)
        const stripe_uuid = client.external_uuid

        if (stripe_uuid) {
            return stripeClient.customers.update(
                stripe_uuid,
                {
                    name: client.name,
                    email: client.email
                }
            )
        } else {
            console.log('Client does not have an external_uuid')
            return false
        }
    }

    return {
        createCustomer,
        checkCredentials,
        createInvoice,
        finalizeInvoice,
        listAllCustomers,
        updateCustomerWithClientId
    }

})();
