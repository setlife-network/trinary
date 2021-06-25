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

    return {
        createClient,
        findClientWithEmail
    }
})()