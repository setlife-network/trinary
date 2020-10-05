const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Allocation: {
        async payment (allocation, args, { models }) {
            return models.Payment.findByPk(allocation.payment_id)
        },
        async project (allocation, args, { models }) {
            return models.Project.findByPk(allocation.project_id)
        },
        async contributor (allocation, args, { models }) {
            return (
                models.Contributor.findByPk(allocation.contributor_id)
                    .then(res => {
                        return attributesMapping.allocationMap(res)
                    })
            )
        }
    },
    Query: {
        getAllocationById: async (root, { id }, { models }) => {
            return models.Allocation.findByPk(id)
        },
        getAllocations: async (root, args, { models }) => {
            return (
                models.Allocation.findAll()
                    .then(res => {
                        const allocations = []
                        res.map(a => {
                            allocations.push(attributesMapping.allocationMap(i))
                        })
                        return allocations
                    })
            )
        }
    },
    Mutation: {
        createAllocation: async (root, {
            id,
            amount,
            rate_type,
            active,
            date_paid,
            payment_id,
            project_id,
            contributor_id
        }, { models }) => {
            return models.Allocation.create({
                amount,
                rate_type,
                active,
                date_paid: moment(date_paid, 'YYYY-MM-DD'),
                payment_id,
                project_id,
                contributor_id
            })
        }
    }
}
