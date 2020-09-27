const Date = require('../helpers/DateScalar')

module.exports = (() => {
    return {
        Payment: {
            async client (payment) {
                return issue.getClients()
            }
        },
        Query: {
            getPayment(root, { id }, { models }) {
                return models.Payment.findBy(id)
            },
            getClientPayments(root, { clientId }, { models }) {
                return models.Payment.findAll({ where: { client_id: clientId } })
            }
        },
        Mutation: {
            createPayment: async(root, {
                amount,
                dateIncurred,
                datePaid,
                clientId
            }) => {
                return models.Issue.create({
                    amount,
                    dateIncurred,
                    datePaid,
                    clientId
                })
            }
        }
    }
})
