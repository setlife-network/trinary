const { Octokit } = require('@octokit/rest');
const axios = require('axios')

const { GITHUB } = require('../config/credentials')
const { GITHUB_OAUTH_URL } = require('../config/constants')

const github = module.exports = (() => {

    const fetchAccessToken = (params) => {
        const opts = { headers: { accept: 'application/json' } };
        return new Promise((resolve, reject ) => {
            axios
                .post(`${GITHUB_OAUTH_URL}?client_id=${GITHUB.OAUTH_CLIENT_ID}&client_secret=${GITHUB.OAUTH_CLIENT_SECRET}&code=${params.code}`, null, opts)
                .then(res => {
                    resolve(res.data['access_token'])
                })
                .catch((error) => {
                    console.error(error)
                })
        });
    };

    const fetchAuthUserData = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        const res = await octokit.users.getAuthenticated({})
        if (res.status == 200) {
            const { avatar_url, email, html_url, id, login, name } = res.data
            return {
                id,
                avatar_url,
                login,
                name,
                email,
                githubUrl: html_url
            }
        } else {
            throw new Error('An error occurred' + res)
        }
    }

    const fetchOrganizationRepos = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        const res = await octokit.repos.listForOrg({
            org: params.organization
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error('An error occurred' + res)
        }
    }

    const fetchRepos = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        const res = params.isOrganization
            ? await octokit.repos.listForOrg({ 
                org: params.organizationName,
                per_page: 100,
                sort: 'updated',
                direction: 'desc',
                page: params.githubPageNumber
            })
            : await octokit.repos.listForUser({
                username: params.organizationName,
                per_page: 100,
                sort: 'updated',
                direction: 'desc',
                page: params.githubPageNumber
            })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error('An error occurred' + res)
        }
    }

    const fetchRepoContributors = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        const res = await octokit.repos.listContributors({
            owner: params.owner,
            repo: params.repo
        })
        if (res.status != 200) {
            throw new Error('An error occurred' + res)
        }
        return res.data
    }

    const fetchRepoInfo = (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        return octokit.repos.get({
            owner: params.owner,
            repo: params.repo
        })
    }

    const fetchRepoIssues = (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        return octokit.paginate(octokit.issues.listForRepo, {
            owner: params.owner,
            repo: params.repo,
            state: 'all'
        })
    }

    const fetchPullRequests = (params) => {
        const octokit = new Octokit({
            auth: params.auth_key
        })
        return octokit.paginate(octokit.pulls.list, {
            owner: params.owner,
            repo: params.repo,
            state: 'all'
        })
    }

    const fetchUserData = async (params) => {
        const octokit = await new Octokit({
            auth: params.auth_key,
        })
        const res = await octokit.users.getByUsername({
            username: params.username
        })
        if (res.status != 200) {
            throw new Error('An error occurred' + res)
        }
        return res.data
    }

    const fetchUserPermission = async (params) => {
        const octokit = await new Octokit({
            auth: params.auth_key,
        })
        const result = await octokit.repos.getCollaboratorPermissionLevel({
            owner: params.owner,
            repo: params.repo,
            username: params.username
        })
        if (result.status == 200) {
            const userPermission = result.data
            return userPermission.permission
        } else {
            throw new Error('An error occurred ' + permission.status)
        }
    }

    const fetchUserOrganizations = async (params) => {
        const octokit = await new Octokit({
            auth: params.auth_key,
        })
        const res = await octokit.orgs.listForAuthenticatedUser()
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error('An error occurred' + res)
        }
    }

    return {
        fetchAccessToken,
        fetchAuthUserData,
        fetchOrganizationRepos,
        fetchRepos,
        fetchRepoContributors,
        fetchRepoInfo,
        fetchRepoIssues,
        fetchPullRequests,
        fetchUserData,
        fetchUserPermission,
        fetchUserOrganizations
    }
})()
