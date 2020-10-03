const moment = require('moment')

module.exports = {

    Allocation: {
        async payment (allocation, args, { models }) {
            return models.Payment.findByPk(allocation.payment_id)
        },
        async project (allocation, args, { models }) {
            return models.Project.findByPk(allocation.project_id)
        },
        async contributor (allocation, args, { models }) {
            return models.Contributor.findByPk(allocation.contributor_id)
        }
    },
    Query: {
        getAllocationById: async (root, { id }, { models }) => {
            return models.Allocation.findByPk(id)
        },
        getAllocations: async (root, args, { models }) => {
            return models.Allocation.findAll()
        }
    },
    Mutation: {
        createAllocation: async (root, {
            id,
            amount,
            rate_type,
            active,
            date_created,
            date_paid,
            payment_id,
            project_id,
            contributor_id
        }, { models }) => {
            return models.Allocation.create({
                amount,
                rate_type,
                active,
                date_created: moment(date_created, 'YYYY-MM-DD'),
                date_paid: moment(date_paid, 'YYYY-MM-DD'),
                payment_id,
                project_id,
                contributor_id
            })
        },
        deleteAllocationById: async (root, { id }, { models }) => {
            return models.Allocation.destroy({ where: { id } })
        }
    }
}
