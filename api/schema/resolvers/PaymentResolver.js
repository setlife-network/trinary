const Date = require('../helpers/DateScalar')

module.exports = {

    Payment: {
        async client (payment, args, { models }) {
            return models.Client.findByPk(payment.client_id)
        }
    },
    Query: {
        payment(root, { id }, { models }) {
            return models.Payment.findBy(id)
        },
        payments(root, args, { models }) {
            return models.Payment.findAll()
        },
        clientPayments(root, { clientId }, { models }) {
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
                date_incurred,
                date_paid,
                client_id
            })
        }
    }

}
