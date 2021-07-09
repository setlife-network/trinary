const db = require('../models')

const clientManagement = module.exports = (() => {

    const createClient = async (params) => {
        const stripe = require('../handlers/stripe')

        const { createFields } = params

        const createdClient = await db.models.Client.create({
            ...createFields
        })

        if (!createFields.external_uuid) {
            await stripe.createCustomer({
                email: createFields.email,
                name: createFields.name,
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

    const updateClient = async (params) => {
        let clientToUpdate
        if (params.clientInformation.external_uuid) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    external_uuid: params.clientInformation.external_uuid
                }
            })
        }
        if (params.clientInformation.email && (clientToUpdate === null)) {
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    email: params.clientInformation.email
                }
            })
        }
        if (clientToUpdate) {
            clientToUpdate.email = params.clientInformation.email
            clientToUpdate.currency = params.clientInformation.currency
            clientToUpdate.name = params.clientInformation.name
            clientToUpdate.external_uuid = params.clientInformation.external_uuid
            await clientToUpdate.save()
        } else {
            createClient({ createFields: params.clientInformation })
        }
    }

    return {
        createClient,
        findClientWithEmail,
        findClientWithId,
        updateClient
    }
})()
