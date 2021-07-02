const stripe = require('../handlers/stripe')
const db = require('../models')

const clientManagement = module.exports = (() => {

    const createClient = async (params) => {
        const fields = params.createFields
        const createdClient = db.models.Client.create({
            ...fields
        })
        await stripe.createCustomer({ fields })
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
        console.log('findClientWithId');
        return db.models.Client.findByPk(clientId)
    }

    return {
        createClient,
        findClientWithEmail,
        findClientWithId
    }
})()
