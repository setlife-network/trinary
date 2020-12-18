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
        }
    },
    Query: {
        checkSession: (root, args, { models, cookies }) => {
            console.log('req');
            console.log('req.session')
            console.log(cookies)
            console.log('req.session.userSession')
            console.log(cookies.userSession)
            if (cookies.userSession) {
                return models.Contributor.findByPk(cookies.userSession)
            } else {
                throw new AuthenticationError('You must be authenticated')
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
