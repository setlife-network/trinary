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

    return {
        createClient
    }
})()