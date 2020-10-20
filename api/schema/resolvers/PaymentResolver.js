const { UserInputError } = require('apollo-server');

const moment = require('moment')

const apiModules = require('../../modules');

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
        deletePaymentById: (root, { id }, { models }) => {
            return models.Payment.destroy({ where: { id } })
        },
        syncPayments: async (root, { source }, { models }) => {
            if (source.toUpperCase() == 'INVOICELY') return apiModules.dataSyncs.syncInvoicelyCSV()
            else throw new UserInputError(`There's not source that matchs the input`);
        },
        updatePaymentById: (root, {
            id,
            updateFields,
            date_incurred,
            date_paid,
        }, { models }) => {
            if (date_incurred) date_incurred = moment(date_incurred, 'MM-DD-YYYY HH:mm:ss').utc()
            if (date_paid) date_paid = moment(date_paid, 'MM-DD-YYYY HH:mm:ss').utc()
            return models.Payment.update({
                ...updateFields,
                date_incurred,
                date_paid
            }, {
                where: {
                    id
                }
            })
        }
    }

}
