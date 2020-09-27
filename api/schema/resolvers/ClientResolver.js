const Date = require('../helpers/DateScalar')

module.exports = (() => {

    return {
        Client: {
            async payment (client) {
                return client.getPayments()
            },
            async proyect (client) {
                return client.getProyects()
            },
            async contributor (client) {
                return client.getContributors()
            }
        },
        Query: {
            getClient: async (root, { id }, { models }) => {
                return models.Client.findBy(id)
            },
            getClients: async (root, { models }) => {
                return models.Client.findAll()
            }
        },
        Mutations: {
            createClient: async (root, {
                is_active,
                name,
                currency,
                date_created
            }) => {
                return models.Allocation.create({
                    is_active,
                    name,
                    currency,
                    date_created
                })
            }
        }
    }
})
