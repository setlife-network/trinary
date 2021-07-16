const db = require('../models')

const accessManagement = module.exports = (() => {

    const createPermission = async (params) => {
        const { permissionFields } = params

        return db.models.Permission.create({
            ...permissionFields
        })
    }

    const grantClientPermissionToContributor = async ({
        accessLevel = 'read',
        clientId,
        contributorId,
    }) => {
        if (!clientId) {
            throw new Error('clientId is required')
        }
        if (!contributorId) {
            throw new Error('contributorId is required')
        }

        const client = await db.models.Client.findByPk(clientId)
        const contributor = await db.models.Contributor.findByPk(contributorId)

        if (client == null) {
            throw new Error('client does not exist')
        }
        if (contributor == null) {
            throw new Error('contributor does not exist')
        }

        return createPermission({
            permissionFields: {
                type: accessLevel,
                contributor_id: contributor.id,
                client_id: client.id
            }
        })
    }

    return {
        createPermission,
        grantClientPermissionToContributor,
    }
})()
