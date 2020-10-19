const moment = require('moment')

module.exports = {

    Client: {
        payments: (client, args, { models }) => {
            return models.Payment.findAll({ where: { client_id: client.id } })
        },
        projects: (client, args, { models }) => {
            return models.Project.findAll({ where: { client_id: client.id } })
        }
    },
    Query: {
        getClientById: (root, { id }, { models }) => {
            return models.Client.findByPk(id)
        },
        getClients: (parent, args, { models }) => {
            return models.Client.findAll()
        }
    },
    Mutation: {
        createClient: (root, { createFields }, { models }) => {
            return models.Client.create({
                ...createFields
            })
        },
        deleteClientById: (root, { id }, { models }) => {
            return models.Client.destroy({ where: { id } })
        },
        updateClientById: async (root, { id, updateFields }, { models }) => {
            await models.Client.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Client.findByPk(id)
        }
    }
}
