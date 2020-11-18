const moment = require('moment')
const { fn, col, Op } = require('sequelize')

const { validateDatesFormat } = require('../helpers/inputValidation')

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
