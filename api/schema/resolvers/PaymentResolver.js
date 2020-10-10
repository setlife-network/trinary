const moment = require('moment')

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
        createPayment: (root, {
            createFields,
            date_incurred,
            date_paid
        }, { models }) => {
            return models.Payment.create({
                date_incurred: moment(date_incurred, 'MM-DD-YYYY HH:mm:ss').utc(),
                date_paid: moment(date_paid, 'MM-DD-YYYY HH:mm:ss').utc(),
                ...createFields
            })
        },
        deletePaymentById: async (root, { id }, { models }) => {
            return models.Payment.destroy({ where: { id } })
        },
        updatePaymentById: async(root, {
            id,
            amount,
            date_incurred,
            date_paid,
            client_id
        }, { models }) => {
            return models.Payment.update({
                amount,
                date_incurred,
                date_paid,
                client_id
            }, {
                where: {
                    id
                }
            })
        }    
    }

}
