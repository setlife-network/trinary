const { split } = require('lodash')

const { fetchAuthUserData } = require('../handlers/github')
const db = require('../models')

const authentication = module.exports = (() => {

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

    return {
        createContributor,
        getContributor
    }

})()
