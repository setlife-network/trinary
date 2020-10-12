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
                date_incurred: moment(date_incurred, 'YYYY-MM-DD').utc(),
                date_paid: moment(date_paid, 'YYYY-MM-DD').utc(),
                ...createFields
            })
        },
        deletePaymentById: (root, { id }, { models }) => {
            return models.Payment.destroy({ where: { id } })
        },
        updatePaymentById: (root, {
            id,
            updateFields,
            date_incurred,
            date_paid,
        }, { models }) => {
            const dateIncurred = moment(date_incurred, 'YYYY-MM-DD', true).utc()
            const datePaid = moment(date_paid, 'YYYY-MM-DD', true).utc()
            if ((date_incurred && !date_incurred.isValid()) || (datePaid && !datePaid.isValid())) {
                throw new UserInputError('Date format invalid');
            }
            return models.Payment.update({
                ...updateFields,
                date_incurred: dateIncurred,
                date_paid: datePaid
            }, {
                where: {
                    id
                }
            })
        }
    }

}
