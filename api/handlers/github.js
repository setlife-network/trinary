const { Octokit } = require('@octokit/rest');
const axios = require('axios')

const { GITHUB } = require('../config/credentials')
const { GITHUB_OAUTH_URL } = require('../config/constants')

const github = module.exports = (() => {

    const fetchAccessToken = (params) => {
        const opts = { headers: { accept: 'application/json' } };
        return new Promise((resolve, reject ) => {
            axios
                .post(`${GITHUB_OAUTH_URL}?client_id=${GITHUB.CLIENT_ID}&client_secret=${GITHUB.CLIENT_SECRET}&code=${params.code}`, null, opts)
                .then(res => {
                    resolve(res.data['access_token'])
                })
                .catch((error) => {
                    console.error(error)
                })
        });
    };

    const fetchRepos = (params) => {
        return new Promise((resolve, reject) => {
            const octokit = new Octokit({
                auth: params.auth_key,
            });
            octokit.repos.listForAuthenticatedUser()
                .then(result => {
                    if (result.status == 200) {
                        resolve(result)
                    } else {
                        throw (result.status)
                    }
                })
                .catch(error => {
                    reject(new Error('An error ocurred ' + error))
                })
        })
    }

    const fetchRepoIssues = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key,
        });

        const res = await octokit.issues.listForRepo({
            owner: params.owner,
            repo: params.repo,
        })

        if (res.status == 200) {
            return res
        } else {
            throw new Error('An error ocurred ' + error)
        }
    }

    const fetchUserData = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key,
        });

        const result = await octokit.users.getAuthenticated({})

        if (result.status == 200) {
            const { html_url, id, name, email } = result.data

            return {
                id,
                name,
                email,
                githubUrl: html_url
            }
        } else {
            throw new Error('An error occurred' + result.status)
        }
    }

    return {
        fetchUserData,
        fetchRepos,
        fetchRepoIssues,
        fetchAccessToken
    }
})()
