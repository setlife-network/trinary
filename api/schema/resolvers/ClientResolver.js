const moment = require('moment')
const { fn, col, Op } = require('sequelize')

const { validateDatesFormat } = require('../helpers/inputValidation')
const apiModules = require('../../modules')

module.exports = {

    Client: {
        payments: (client, args, { models }) => {
            return models.Payment.findAll({ where: { client_id: client.id } })
        },
        projects: (client, args, { models }) => {
            return models.Project.findAll({ where: { client_id: client.id } })
        },
        totalPaid: async (client, args, { models }) => {
            //MARK: Review if validateDatesFormat({ ...args }) is the best solution, consider if we pass more attributes non date this will break
            validateDatesFormat({ ...args })
            const totalPaid = await models.Payment.findOne({
                raw: true,
                attributes: [[fn('sum', col('amount')), 'total']],
                where: {
                    client_id: client.id,
                    date_incurred: { [Op.between]: [
                        args.fromDate
                            ? args.fromDate
                            : moment.utc(1),
                        args.toDate
                            ? args.toDate
                            : moment.utc()
                    ] }
                }
            })
            return totalPaid.total
        }
    },
    Query: {
        getClientById: (root, { id }, { models }) => {
            return models.Client.findByPk(id)
        },
        getClients: (root, args, { models }) => {
            return models.Client.findAll()
        },
        getActiveClientsCount: (root, args, { models }) => {
            return models.Client.count({
                where: {
                    is_active: true
                }
            })
        }
    },
    Mutation: {
        createClient: async (root, args, { cookies, models }) => {
            const stripeHandler = require('../../handlers/stripe')

            const { createFields } = args

            if (!cookies.userSession || createFields.contributor_id) {
                throw new Error('You must either be logged in as a contributor or provide a value for createFields.contributor_id');
            }

            let createdClient
            try {
                createdClient = await apiModules.clientManagement.createClient({
                    createFields
                })
            } catch {
                throw new Error('Failed to create Client')
            }

            // Create a Stripe Customer if possible
            // external_uuid will be linked to Client via Stripe webhooks
            try {
                await stripeHandler.createCustomer({
                    name: createFields.name,
                    email: createFields.email,
                })
            } catch {
                throw new Error('Failed to create Stripe Customer')
            }

            // Grant owner access to the contributor that created the client
            await apiModules.accessManagement.grantClientPermissionToContributor({
                accessLevel: 'owner',
                clientId: createdClient.id,
                contributorId: cookies
                    ? cookies.userSession
                    : createFields.contributor_id
            })

            return createdClient
        },
        deleteClientById: (root, { id }, { models }) => {
            return models.Client.destroy({ where: { id } })
        },
        updateClientById: async (root, { id, updateFields }, { models }) => {
            const stripeHandler = require('../../handlers/stripe')

            await models.Client.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })

            // Update Stripe Customer if possible
            try {
                await stripeHandler.updateCustomerWithClientId({
                    clientId: id,
                })
            } catch {
                console.error('Failed to update Stripe Customer')
            }

            return models.Client.findByPk(id)
        }
    }
}
