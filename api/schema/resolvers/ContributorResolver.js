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
        createContributor: (root, {
            createFields
        }, { models }) => {
            return models.Contributor.create({
                ...createFields
            })
        },
        deleteContributorById: (root, { id }, { models }) => {
            return models.Contributor.destroy({ where: { id } })
        },
        updateContributorById: (root, {
            id,
            hourly_rate,
            weekly_rate,
            monthly_rate,
            name
        }, { models }) => {
            return models.Contributor.update({
                hourly_rate,
                weekly_rate,
                monthly_rate,
                name
            }, {
                where: {
                    id
                }
            })
        }
    }

}
