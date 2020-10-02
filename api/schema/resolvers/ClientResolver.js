const moment = require('moment')

module.exports = {

    Client: {
        async payments (client, args, { models }) {
            return models.Payment.findAll({ where: { client_id: client.id } })
        },
        async projects (client, args, { models }) {
            return models.Project.findAll({ where: { client_id: client.id } })
        }
    },
    Query: {
        getClientById: async (root, { id }, { models }) => {
            return models.Client.findByPk(id)
        },
        getClients: async (parent, args, { models }) => {
            return models.Client.findAll()
        }
    },
    Mutation: {
        createClient: async (root, {
            is_active,
            name,
            currency,
            date_created
        }, { models }) => {
            return models.Client.create({
                is_active,
                name,
                currency,
                date_created: moment(date_created, 'YYYY-MM-DD')
            })
        }
    }

}
