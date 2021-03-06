const github = require('../handlers/github')
const db = require('../models')

const automations = module.exports = (() => {

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

    const getOrganizationRepos = async (params) => {
        const organizations = await getUserOrganizations({
            auth_key: params.auth_key
        })
        const repos = await github.fetchRepos({
            auth_key: params.auth_key
        })
        console.log('organizations')
        console.log(organizations.length)
        console.log('repos')
        console.log(repos.length)
        organizations.map(async o => {
            const organizationRepos = []
            repos.map(r => {
                console.log(r)
                if (o.name == 'otech47') {
                    console.log(r.owner.login)
                }
                if (r.owner.login == o.name) {
                    organizationRepos.push({
                        id: r.id,
                        name: r.name,
                        githubUrl: r.html_url,
                    })
                }
            })
            o.repos = organizationRepos
        })
        return organizations
    }

    return {
        getUserOrganizations,
        getOrganizationRepos,
    }

})()
