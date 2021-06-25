const db = require('../models')

const clientManagement = module.exports = (() => {

    const createClient = async (params) => {
        const stripe = require('../handlers/stripe')
        console.log(stripe)
        console.log(stripe.createCustomer)

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

    return {
        createClient,
        findClientWithEmail
    }
})()