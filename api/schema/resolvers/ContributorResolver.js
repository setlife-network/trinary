const { AuthenticationError } = require('apollo-server')
const { col, fn } = require('sequelize')

const toggl = require('../../handlers/toggl')
const apiModules = require('../../modules');

module.exports = {
    Contributor: {
        paidByCurrency: async (contributor, args, { models }) => {
            const totalPaidByCurrencyQuery = await models.Client.findAll({
                group: 'currency',
                attributes: ['currency'],
                raw: true,
                include: {
                    model: models.Project,
                    attributes: [],
                    required: true,
                    include: {
                        model: models.Allocation,
                        attributes: [[fn('sum', col('amount')), 'amount']],
                        where: {
                            contributor_id: contributor.id
                        },
                    }
                }
            })
            totalPaidByCurrency = []
            totalPaidByCurrencyQuery.map(t => {
                totalPaidByCurrency.push(
                    {
                        currency: t['currency'],
                        amount: t['Projects.Allocations.amount']
                    }
                )
            })
            return totalPaidByCurrency
        },
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
        totalPaid: async (contributor, args, { models }) => {
            const totalPaid = await models.Allocation.sum('amount', {
                where: {
                    contributor_id: contributor.id
                }
            })
            if (!totalPaid) return 0
            return totalPaid
        },
        allocations: (contributor, args, { models }) => {
            return models.Allocation.findAll({
                where: {
                    contributor_id: contributor.id
                }
            })
        },
        rates: (contributor, args, { models }) => {
            return models.Rate.findAll({
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
        },
        getContributorGithubOrganizations: async (root, { id }, { models, cookies }) => {
            const contributorAccessToken = (
                await models.Contributor.findByPk(
                    cookies.userSession
                        ? cookies.userSession
                        : id
                )
            )
            const contributorOrganizations = await apiModules.automations.getOrganizationRepos({
                auth_key: contributorAccessToken.github_access_token
            })
            return contributorOrganizations
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
