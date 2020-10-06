const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Payment: {
        async client (payment, args, { models }) {
            return (

                models.Client.findByPk(payment.clientId)
                    .then(res => {
                        return attributesMapping.clientMap(res)
                    })
            )
        }
    },
    Query: {
        getPaymentById(root, { id }, { models }) {
            return (
                models.Payment.findByPk(id)
                    .then(res => {
                        return attributesMapping.paymentMap(res)
                    })
            )
        },
        getPayments(root, args, { models }) {
            return (
                models.Payment.findAll()
                    .then(res => {
                        const payments = []
                        res.map(p => {
                            payments.push(attributesMapping.paymentMap(p))
                        })
                        return payments
                    })
            )
        },
        getClientPaymentsByClientId(root, { clientId }, { models }) {
            return (
                models.Payment.findAll({ where: { client_id: clientId } })
                    .then(res => {
                        const payments = []
                        res.map(p => {
                            payments.push(attributesMapping.paymentMap(p))
                        })
                        return payments
                    })
            )
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
        }
    }

}
