const db = require('../models')

const clientManagement = module.exports = (() => {

    const createClient = async ({ stripeCustomerObject }) => {
        const stripe = require('../handlers/stripe')

        const clientInformation = {
            email: stripeCustomerObject.email,
            currency: stripeCustomerObject.currency || 'SATS',
            name: stripeCustomerObject.name,
            date_created: stripeCustomerObject.created,
            external_uuid: stripeCustomerObject.id,
            is_active: 1
        }
        
        const createdClient = await db.models.Client.create({
            ...clientInformation
        })

        if (!clientInformation.external_uuid) {
            await stripe.createCustomer({
                email: clientInformation.email,
                name: clientInformation.name,
            })
        }

        return createdClient
    }

    const findClientWithEmail = async (params) => {
        return db.models.Client.findOne({
            where: {
                email: params.email
            }
        })
    }

    const updateClient = async ({ stripeCustomerObject }) => {
        let clientToUpdate
        const clientInformation = {
            email: stripeCustomerObject.email,
            currency: stripeCustomerObject.currency || 'SATS',
            name: stripeCustomerObject.name,
            date_created: stripeCustomerObject.created,
            external_uuid: stripeCustomerObject.id,
            is_active: 1
        }
        if (clientInformation.external_uuid) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    external_uuid: clientInformation.external_uuid
                }
            })
        }
        if (clientInformation.email && (clientToUpdate === null)) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    email: clientInformation.email
                }
            })
        }
        if (clientToUpdate) {
            clientToUpdate.email = clientInformation.email
            clientToUpdate.currency = clientInformation.currency
            clientToUpdate.name = clientInformation.name
            clientToUpdate.external_uuid = clientInformation.external_uuid
            await clientToUpdate.save()
        } else {
            createClient({ clientInformation })
        }
    }

    return {
        createClient,
        findClientWithEmail,
        updateClient
    }
})()