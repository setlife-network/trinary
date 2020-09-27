const Date = require('../helpers/DateScalar')

module.exports = (() => {
    return {
        Query: {
            getContributors(_, { models }) {
                return models.Contributor.findAll()
            },
            getContributor(_, { id }, { models }) {
                return models.Contributor.findBy(id)
            }
        },
        Mutation: {
            createContributor: async (root, {
                hourly_rate,
                weekly_rate,
                monthly_rate,
                name,
                date_created
            }) => {
                return models.Contributor.create({
                    hourly_rate,
                    weekly_rate,
                    monthly_rate,
                    name,
                    date_created
                })
            }
        }
    }
})
