const moment = require('moment')
const { validateDateFormat } = require('../helpers/inputValidation')

module.exports = {

    Payment: {
        client: (payment, args, { models }) => {
            return models.Client.findByPk(payment.client_id)
        }
    },
    Query: {
        getPaymentById: (root, { id }, { models }) => {
            return models.Payment.findByPk(id)
        },
        getPayments: (root, args, { models }) => {
            return models.Payment.findAll()
        },
        getClientPaymentsByClientId: (root, { clientId }, { models }) => {
            return models.Payment.findAll({ where: { client_id: client_id } })
        }
    },
    Mutation: {
        createPayment: (root, { createFields }, { models }) => {
            createFields['date_incurred'] = validateDateFormat(createFields['date_incurred'])
            createFields['date_paid'] = validateDateFormat(createFields['date_paid'])
            return models.Payment.create({
                ...createFields
            })
        },
        deletePaymentById: (root, { id }, { models }) => {
            return models.Payment.destroy({ where: { id } })
        },
        updatePaymentById: async (root, { id, updateFields }, { models }) => {
            updateFields['date_incurred'] = validateDateFormat(updateFields['date_incurred'])
            updateFields['date_paid'] = validateDateFormat(updateFields['date_paid'])
            await models.Payment.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Payment.findByPk(id)
        }
    }

}
