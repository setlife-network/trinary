const moment = require('moment')

module.exports = {

    Query: {
        getContributorById: (root, { id }, { models }) => {
            return models.Contributor.findByPk(id)
        },
        getContributors: (root, args, { models }) => {
            return models.Contributor.findAll()
        }
    },
    Mutation: {
        createContributor: (root, { createFields }, { models }) => {
            return models.Contributor.create({
                ...createFields
            })
        },
        deleteContributorById: (root, { id }, { models }) => {
            return models.Contributor.destroy({ where: { id } })
        },
        updateContributorById: async (root, { id, updateFields }, { models }) => {
            await models.Contributor.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Contributor.findByPk(id)
        }
    }

}
