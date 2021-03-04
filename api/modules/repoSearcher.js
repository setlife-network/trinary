const github = require('../handlers/github')
const { GITHUB } = require('../config/credentials')

const repoSearcher = module.exports = (() => {

    const getUserOrganizations = async (params) => {
        //user organizations are the organizations that the contributor is added as a internal collaborator
        //we also add the self github contributor user for implementation details
        //userOrganizations = github organizations + github user
        const githubContributorUser = await github.fetchAuthUserData({
            auth_key: params.auth_key
        })
        const githubUserOrganizations = await github.fetchUserOrganizations({
            auth_key: params.auth_key
        })
        const userOganizations = []
        userOganizations.push({
            id: githubContributorUser.id,
            name: githubContributorUser.name
        })
        githubUserOrganizations.map(o => {
            userOganizations.push({
                id: o.id,
                name: o.login
            })
        })
        return userOganizations
    }

    return {
        getUserOrganizations
    }

})()
