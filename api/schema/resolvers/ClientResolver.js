const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

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
            return (
                models.Client.findByPk(id)
                    .then(res => {
                        return attributesMapping.clientMap(res)
                    })
            )
        },
        getClients: async (parent, args, { models }) => {
            return (
                models.Client.findAll()
                    .then(res => {
                        const clients = []
                        res.map(c => {
                            clients.push(
                                attributesMapping.clientMap(c)
                            )
                        })
                        return clients
                    })
            )
        }
    },
    Mutation: {
        createClient: async (root, {
            is_active,
            name,
            currency,
        }, { models }) => {
            return models.Client.create({
                is_active,
                name,
                currency
            })
        }
    }

}
