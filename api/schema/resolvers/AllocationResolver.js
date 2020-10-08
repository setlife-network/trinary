const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Allocation: {
        payment: (allocation, args, { models }) => {
            return models.Payment.findByPk(allocation.payment_id)
        },
        project: (allocation, args, { models }) => {
            return models.Project.findByPk(allocation.project_id)
        },
        contributor: (allocation, args, { models }) => {
            return models.Contributor.findByPk(allocation.contributor_id)

        }
    },
    Query: {
        getAllocationById: (root, { id }, { models }) => {
            return models.Allocation.findByPk(id)
        },
        getAllocations: (root, args, { models }) => {
            return models.Allocation.findAll()

        }
    },
    Mutation: {
        createAllocation: (root, {
            id,
            createFields,
            date_paid
        }, { models }) => {
            return models.Allocation.create({
                date_paid: moment(date_paid, 'YYYY-MM-DD HH:mm:ss').utc(),
                ...createFields
            })
        }
    }
}
