const github = require('../handlers/github')
const db = require('../models')

const automations = module.exports = (() => {

    const getOrganizationRepos = async (params) => {
        const organizations = await getUserOrganizations({
            auth_key: params.auth_key
        })
        const isOrganization = organizations[0].name != params.organizationName

        const repos = await github.fetchRepos({
            auth_key: params.auth_key,
            organizationName: params.organizationName,
            isOrganization
        })
        const organizationRepos = []
        repos.map(r => {
            if (r.owner.login == params.organizationName) {
                organizationRepos.push({
                    id: r.id,
                    name: r.name,
                    githubUrl: r.html_url,
                })
            }
        })
        return organizationRepos
    }

    const getTogglPropertiesFromURL = async (params) => {
        // Url example https://track.toggl.com/3070292/projects/156669532
        URL = params.toggl_url
        const splitedUrl = URL.split(/\//)
        const workspaceId = splitedUrl[2]
        const projectId = splitedUrl[4]

        return { workspaceId, projectId }
    }

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
        const userOrganizations = []
        userOrganizations.push({
            id: githubContributorUser.id,
            avatar: githubContributorUser.avatar_url,
            name: githubContributorUser.login
        })
        githubUserOrganizations.map(o => {
            userOrganizations.push({
                id: o.id,
                avatar: o.avatar_url,
                name: o.login
            })
        })
        return userOrganizations
    }

    return {
        getOrganizationRepos,
        getTogglPropertiesFromURL,
        getUserOrganizations,
    }

})()
