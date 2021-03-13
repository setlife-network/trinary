const { findIndex } = require('lodash')

import { GITHUB_PERMISSIONS } from '../config/constants'

module.exports(() => {

    const createPermission = async ({ contributor, githubPermission, project }) => {
        // const permission = GITHUB_PERMISSIONS.map(p => {
        //     if (githubPermission == p.github_permission_level) {
        //         return p.project_permission_level
        //     }
        // })
        const permissionIndex = findIndex(GITHUB_PERMISSIONS, ['github_permission_level', githubPermission])
        const permission = GITHUB_PERMISSIONS[permissionIndex].project_permission_level
        return db.models.Permission.create({
            type: permission,
            contributor_id: contributor.id,
            project_id: project.id
        })
    }

    const handleContributorPermission = async ({ contributor, githubContributor, project }) => {
        const repoInfo = split(project.github_url, '/')
        const contributorInfo = split(contributor.github_handle, '/')
        const githubContributorPermission = await fetchUserPermission({
            auth_key: contributor.github_access_token,
            owner: repo[repo.length - 2],
            repo: repo[repo.length - 1],
            username: contributorInfo[contributorInfo.lenth - 1]
        })
        const contributorPermission = await db.models.Permission.findOne({
            where: {
                project_id: project.id,
                contributor_id: contributor.id
            }
        })
        //could happen three things:
        //1. the first contributor login so it doesent have permissions
        //2. the contributor has the permission but is outdated
        //3. the contributor has the correct permission stored on the db
        if (!contributorPermission) {
            createPermission({
                contributor: contributor,
                permission: githubContributorPermission,
                project: project
            })
        } else if (contributorPermission) {
            //check if it's correct or needs to be updated

            // GITHUB_PERMISSIONS.map(p => {
            //     if (githubContributorPermission == p.github_permission_level) {
            //         return p.project_permission_level
            //     }
            // })

            const githubPermissionIndex = findIndex(GITHUB_PERMISSIONS, ['github_permission_level', githubContributorPermission])
            if ((GITHUB_PERMISSIONS[githubPermissionIndex].project_permission_level).toUpperCase() != contributorPermission.toUpperCase()) {
                //the permission level needs to be updated
                await updatePermission({
                    contributorId: contributor.id,
                    projectId: project.id,
                    permission: (GITHUB_PERMISSIONS[githubPermissionIndex].project_permission_level).toLowerCase()
                })
            }
            //at this point the permission had been created, updated or correct
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
