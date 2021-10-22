const github = require('../handlers/github')
const db = require('../models')

const automations = module.exports = (() => {
  
    const getOrganizationRepos = async (params) => {
        const contributor = await db.models.Contributor.findOne({
            where: {
                github_id: params.accountId 
            }
        })

        const organizations = []
        const githubAccount = {}
        if (contributor) {
            githubAccount.handle = contributor.github_handle.split(/\//)[3]
        } else {
            organizations.push(
                ...await getUserOrganizations({
                    auth_key: params.auth_key
                })
            )
        }

        if (organizations.length) {
            organizations.map((org) => {
                if (org.id == params.accountId) {
                    githubAccount.handle = org.name
                }
            })
        }
        const repos = await github.fetchRepos({
            auth_key: params.auth_key,
            organizationName: params.organizationName,
            accountName: githubAccount.handle,
            githubPageNumber: params.githubPageNumber,
            isOrganization: organizations.length
        })
        const organizationRepos = []
        repos.map(r => {
            if (r.owner.login == githubAccount.handle) {
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
        const togglURL = params
        try {
            const splitedUrl = togglURL.split('/')
            const togglId = splitedUrl[5]
            const workspaceId = splitedUrl[3]
            return { workspaceId, togglId }
        } catch (err) {
            console.log('an error ocurred while spliting the toggl url: ', err)
        }
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
