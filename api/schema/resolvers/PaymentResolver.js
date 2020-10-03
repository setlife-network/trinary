const moment = require('moment')

module.exports = {

    Payment: {
        async client (payment, args, { models }) {
            return models.Client.findByPk(payment.client_id)
        }
    },
    Query: {
        getPaymentById(root, { id }, { models }) {
            return models.Payment.findBy(id)
        },
        getPayments(root, args, { models }) {
            return models.Payment.findAll()
        },
        getClientPaymentsByClientId(root, { clientId }, { models }) {
            return models.Payment.findAll({ where: { client_id: clientId } })
        }
    },
    Mutation: {
        createPayment: async(root, {
            amount,
            date_incurred,
            date_paid,
            client_id
        }, { models }) => {
            return models.Payment.create({
                amount,
                date_incurred: moment(date_incurred, 'YYYY-MM-DD'),
                date_paid: moment(date_paid, 'YYYY-MM-DD'),
                client_id
            })
        },
        deletePaymentById: async ( root, { id }, { models }) => {
            return models.Payment.destroy({ where: { id } })
        }
    }

}
