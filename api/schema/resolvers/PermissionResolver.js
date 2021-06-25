const { authentication, dataSyncs } = require('../../modules')

module.exports = {
    Permission: {
        contributor: (permission, args, { models }) => {
            return models.Contributor.findByPk(permission.contributor_id)
        },
        project: (permission, args, { models }) => {
            return models.Project.findByPk(permission.project_id)
        }
    },
    Query: {
        getPermissions: (root, args, { models }) => {
            return models.Permission.findAll()
        },
        getPermissionsByProjectId: (root, { id }, { models }) => {
            return models.Permission.findAll({
                where: {
                    project_id: id
                }
            })
        },
        getPermissionsByContributorId: (root, { id }, { models }) => {
            return models.Permission.findAll({
                where: {
                    contributor_id: id
                }
            })
        },
        getPermissionByProjectIdAndContributorId: (root, { project_id, contributor_id }, { models }) => {
            return models.Permission.findOne({
                where: {
                    project_id,
                    contributor_id
                }
            })
        },
    },
    Mutation: {
        createPermission: (root, { createFields }, { models }) => {
            return models.Permission.create({
                ...createFields
            })
        },
        syncContributorsPermissions: async (root, args, { models }) => {
            const contributors = await models.Contributor.findAll({
                raw: true
            })
            contributors.map(async c => {
                await authentication.grantProjectPermissions({
                    contributor: c
                })
            })
            return contributors.length
        }
    }
}
