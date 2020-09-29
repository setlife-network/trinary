const Date = require('../helpers/DateScalar')

module.exports = {

    Query: {
        contributors(root, args, { models }) {
            return models.Contributor.findAll()
        },
        contributor(root, { id }, { models }) {
            return models.Contributor.findByPk(id)
        }
    },
    Mutation: {
        createContributor: async (root, {
            hourly_rate,
            weekly_rate,
            monthly_rate,
            name,
            date_created
        }, { models }) => {
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
