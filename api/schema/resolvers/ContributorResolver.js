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
        }
    }

}
