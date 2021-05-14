const { findIndex, split } = require('lodash')

const db = require('../models')
const { GITHUB_PERMISSIONS } = require('../config/constants')
const { fetchUserPermission } = require('../handlers/github')

module.exports = (() => {

    const createPermission = async ({ contributor, githubPermission, project }) => {
        const permissionIndex = findIndex(GITHUB_PERMISSIONS, ['github_permission_level', githubPermission])
        const permission = GITHUB_PERMISSIONS[permissionIndex].project_permission_level
        return db.models.Permission.create({
            type: permission,
            contributor_id: contributor.id,
            project_id: project.id
        })
    }

    const handleContributorPermission = async ({ contributor, project }) => {
        const projectOwner = await db.models.Contributor.findOne({
            include: [{
                model: db.models.Permission,
                where: {
                    project_id: project.id,
                    type: 'owner'
                }
            }],
            raw: true
        })
        const repoInfo = split(project.github_url, '/')
        const contributorInfo = split(contributor.github_handle, '/')
        try {
            const githubContributorPermission = await fetchUserPermission({
                auth_key: projectOwner.github_access_token,
                owner: repoInfo[repoInfo.length - 2],
                repo: repoInfo[repoInfo.length - 1],
                username: contributorInfo[contributorInfo.length - 1]
            })
            const contributorPermission = await db.models.Permission.findOne({
                where: {
                    project_id: project.id,
                    contributor_id: contributor.id
                },
                raw: true
            })
            //could happen three things:
            //1. the first contributor login so it doesent have permissions
            //2. the contributor has the permission but is outdated
            //3. the contributor has the correct permission stored on the db
            if (!contributorPermission && githubContributorPermission) {
                await createPermission({
                    contributor: contributor,
                    githubPermission: githubContributorPermission,
                    project: project
                })
            } else if (contributorPermission) {
                //check if it's correct or needs to be updated
                const githubPermissionIndex = findIndex(GITHUB_PERMISSIONS, ['github_permission_level', githubContributorPermission])
                if ((GITHUB_PERMISSIONS[githubPermissionIndex].project_permission_level).toUpperCase() != contributorPermission.type.toUpperCase()) {
                    //the permission level needs to be updated
                    await updatePermission({
                        contributorId: contributor.id,
                        projectId: project.id,
                        permission: (GITHUB_PERMISSIONS[githubPermissionIndex].project_permission_level).toLowerCase()
                    })
                }
                //at this point the permission had been created, updated or correct
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    const updatePermission = async ({ contributorId, projectId, permission }) => {
        const contributorProjectPermission = await db.models.Permissions.findOne({
            where: {
                contributr_id: contributorId,
                project_id: projectId
            }
        })
        contributorProjectPermission.type = permission
        return contributorProjectPermission.save()
    }

    return {
        handleContributorPermission
    }
})();
