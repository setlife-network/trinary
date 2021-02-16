const { validateDatesFormat } = require('../helpers/inputValidation')

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
        },
        rate: (allocation, args, { models }) => {
            return models.Rate.findByPk(allocation.rate_id)
        }
    },
    Query: {
        getAllocationById: (root, { id }, { models }) => {
            return models.Allocation.findByPk(id)
        },
        getAllocations: (root, args, { models }) => {
            const whereConditions = {}
            if (args.contributorId) {
                whereConditions['contributor_id'] = args.contributorId
            }
            if (args.projectId) {
                whereConditions['project_id'] = args.projectId
            }
            return models.Allocation.findAll({
                where: whereConditions
            })
        }
    },
    Mutation: {
        createAllocation: (root, {
            id,
            createFields
        }, { models }) => {
            validateDatesFormat({
                date_paid: createFields['date_paid'],
                start_date: createFields['start_date'],
                end_date: createFields['end_date']
            })
            return models.Allocation.create({
                ...createFields
            })
        },
        deleteAllocationById: (root, { id }, { models }) => {
            return models.Allocation.destroy({ where: { id } })
        },
        updateAllocationById: async (root, { id, updateFields }, { models }) => {
            validateDatesFormat({
                date_paid: updateFields['date_paid'],
                start_date: updateFields['start_date'],
                end_date: updateFields['end_date']
            })
            await models.Allocation.update({
                ...updateFields,
            }, {
                where: {
                    id
                }
            })
            return models.Allocation.findByPk(id)
        }
    }
}
