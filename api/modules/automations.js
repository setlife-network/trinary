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
        
        const contributor = await db.models.Contributor.findOne({
            where: {
                github_id: params.accountId 
            }
        })

        let organizations
        let accountName
        let isOrganization = false
        if (contributor) {
            const contributorSplit = contributor.github_handle.split(/\//)
            accountName = contributorSplit[3]
        } else {
            organizations = await getUserOrganizations({
                auth_key: params.auth_key
            })
        }

        if (organizations) {
            isOrganization = true
            organizations.map((org, i) => {
                if (org.id == params.accountId) {
                    accountName = org.name
                }
            })
        }
        console.log(accountName, isOrganization)
        const repos = await github.fetchRepos({
            auth_key: params.auth_key,
            accountName,
            githubPageNumber: params.githubPageNumber,
            isOrganization
        })
        const organizationRepos = []
        repos.map(r => {
            if (r.owner.login == accountName) {
                organizationRepos.push({
                    id: r.id,
                    name: r.name,
                    githubUrl: r.html_url,
                })
            }
        })
        return organizationRepos
    }

    return {
        getUserOrganizations,
        getOrganizationRepos,
    }

})()
