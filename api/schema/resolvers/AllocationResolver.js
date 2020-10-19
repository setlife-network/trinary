const moment = require('moment')
const { validateDateFormat } = require('../helpers/inputValidation')

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
            createFields
        }, { models }) => {
            createFields['date_paid'] = validateDateFormat(createFields['date_paid'])
            createFields['start_date'] = validateDateFormat(createFields['start_date'])
            createFields['end_date'] = validateDateFormat(createFields['end_date'])
            return models.Allocation.create({
                ...createFields
            })
        },
        deleteAllocationById: (root, { id }, { models }) => {
            return models.Allocation.destroy({ where: { id } })
        },
        updateAllocationById: async (root, { id, updateFields }, { models }) => {
            updateFields['date_paid'] = validateDateFormat(updateFields['date_paid'])
            updateFields['start_date'] = validateDateFormat(updateFields['start_date'])
            updateFields['end_date'] = validateDateFormat(updateFields['end_date'])
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
