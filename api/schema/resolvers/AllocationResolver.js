const moment = require('moment')

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
            date_paid,
            start_date,
            end_date
        }, { models }) => {
            return models.Allocation.create({
                date_paid: moment(date_paid, 'YYYY-MM-DD HH:mm:ss').utc(),
                start_date: moment(start_date, 'YYYY-MM-DD HH:mm:ss').utc(),
                end_date: moment(end_date, 'YYYY-MM-DD HH:mm:ss').utc(),
                ...createFields
            })
        }
    }
}
