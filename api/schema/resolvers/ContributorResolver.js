const moment = require('moment')

module.exports = {

    Query: {
        getContributorById(root, { id }, { models }) {
            return models.Contributor.findByPk(id)
        },
        getContributors(root, args, { models }) {
            return models.Contributor.findAll()
        }
    },
    Mutation: {
        createContributor: async (root, {
            hourly_rate,
            weekly_rate,
            monthly_rate,
            name
        }, { models }) => {
            return models.Contributor.create({
                hourly_rate,
                weekly_rate,
                monthly_rate,
                name
            })
        }
    }

}
