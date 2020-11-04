const toggl = require('../../handlers/toggl')

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
        linkTogglContributor: async (root, { contributorId, togglAPIKey }, { models }) => {
            const togglUser = await toggl.fetchUserData({ apiToken: togglAPIKey })
            const contributor = await models.Contributor.update({
                toggl_id: togglUser.id
            }, {
                where: {
                    id: contributorId
                }
            })
            return models.Contributor.findByPk(contributorId)
        },
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
