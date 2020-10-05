const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Query: {
        getContributorById(root, { id }, { models }) {
            return (
                models.Contributor.findByPk(id)
                    .then(res => {
                        return attributesMapping.contributorMap(res)
                    })
            )

        },
        getContributors(root, args, { models }) {
            return (
                models.Contributor.findAll()
                    .then(res => {
                        const contributors = []
                        res.map(c => {
                            contributors.push(attributesMapping.contributorMap(c))
                        })
                        return contributors
                    })
            )
        }
    },
    Mutation: {
        createContributor: async (root, {
            hourly_rate,
            weekly_rate,
            monthly_rate,
            name,
            external_data_url,
            github_id,
            github_handle
        }, { models }) => {
            return models.Contributor.create({
                hourly_rate,
                weekly_rate,
                monthly_rate,
                name,
                external_data_url,
                github_id,
                github_handle
            })
        }
    }

}
