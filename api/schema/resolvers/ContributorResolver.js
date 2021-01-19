const { AuthenticationError } = require('apollo-server')
const toggl = require('../../handlers/toggl')

module.exports = {
    Contributor: {
        permissions: (contributor, args, { models }) => {
            return models.Permission.findAll({
                where: {
                    contributor_id: contributor.id
                }
            })
        },
        timeEntries: (contributor, args, { models }) => {
            return models.TimeEntry.findAll({
                where: {
                    contributor_id: contributor.id
                }
            })
        },
        allocations: (contributor, args, { models }) => {
            return models.Allocation.findAll({
                where: {
                    contributor_id: contributor.id
                }
            })
        }
    },
    Query: {
        checkSession: (root, args, { models, cookies }) => {
            if (cookies.userSession) {
                return models.Contributor.findByPk(cookies.userSession)
            }
        },
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
