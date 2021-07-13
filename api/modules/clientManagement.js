const db = require('../models')

const clientManagement = module.exports = (() => {

    const createClientFromStripeCustomer = async (params) => {
        const stripe = require('../handlers/stripe')

        const { stripeCustomerObject } = params

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

    const findClientWithId = async (clientId) => {
        return db.models.Client.findByPk(clientId)
    }

    const findClientWithExternalId = (params) => {
        return db.models.Client.findOne({
            where: {
                external_uuid: params.id
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

        const {
            email,
            name,
            currency,
            external_uuid
        } = clientInformation

        if (clientInformation.external_uuid) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    external_uuid
                }
            })
        }
        if (clientInformation.email && (clientToUpdate === null)) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    email
                }
            })
        }
        if (clientToUpdate) {
            clientToUpdate.email = email
            clientToUpdate.currency = currency
            clientToUpdate.name = name
            clientToUpdate.external_uuid = external_uuid
            await clientToUpdate.save()
        } else {
            createClientFromStripeCustomer({ clientInformation })
        }
    }

    return {
        createClientFromStripeCustomer,
        findClientWithEmail,
        findClientWithExternalId,
        findClientWithId,
        updateClient
    }
})()
