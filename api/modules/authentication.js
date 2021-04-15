const { split } = require('lodash')

const { fetchAuthUserData, fetchUserPermission } = require('../handlers/github')
const { handleContributorPermission } = require('../scripts/githubPermissions')
const db = require('../models')

const authentication = module.exports = (() => {

    const createContributor = async (githubContributor) => {
        const githubContributorInfo = split(githubContributor.githubUrl, '/')
        const githubContributorUsername = githubContributorInfo[githubContributorInfo.length - 1]
        return db.models.Contributor.create({
            name: githubContributor.name ? githubContributor.name : githubContributorUsername,
            github_id: githubContributor.id,
            github_handle: githubContributor.githubUrl,
            github_access_token: githubContributor.accessToken
        })
    }

    const getContributor = async ({ githubAccessToken }) => {
        const githubContributor = await fetchAuthUserData({ auth_key: githubAccessToken })
        const contributor = await db.models.Contributor.findOne({
            where: {
                github_id: githubContributor.id
            }
        })
        return {
            contributor,
            githubContributor
        }
    }

    const grantProjectPermissions = async ({ contributor, githubContributor }) => {
        const projects = await db.models.Project.findAll({
            raw: true
        })
        await projects.map(async p => {
            await handleContributorPermission({
                contributor: contributor,
                githubContributor: githubContributor,
                project: p,
            })
        })
    }

    const updateGithubAccessTokenContributor = async (githubContributor) => {
        const contributor = await db.models.Contributor.findOne({
            where: {
                github_id: githubContributor.id
            }
        })
        contributor.github_access_token = githubContributor.accessToken
        return contributor.save()
    }

    return {
        createContributor,
        getContributor,
        grantProjectPermissions,
        updateGithubAccessTokenContributor
    }

})()
