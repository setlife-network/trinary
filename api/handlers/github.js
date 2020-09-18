const { Octokit } = require('@octokit/rest');

const github = module.exports = (() => {

    const fetchTeamData = async (params) => {

        const octokit = new Octokit({
            auth: params.auth_key,
        });
        const teamInfo = await octokit.users.getAuthenticated();
        if (teamInfo.status == 200) {
            //request was made succesfully
            return teamInfo.data
        } else {
            return ('An error ocurred')
        }

    }

    //TODO: modify for organizations
    const fetchTeamRepos = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key,
        });
        const repoList = await octokit.repos.listForAuthenticatedUser();

        return repoList
    }

    const fetchUserIssues = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key,
        });

        return octokit.issues.list();
    }

    const fetchRepoIssues = async (params) => {
        const octokit = new Octokit({
            auth: params.auth_key,
        });
        return octokit.issues.listForRepo({
            owner: params.auth_key,
            repo: params.repo_id,
        });

    }

    return {
        fetchTeamData,
        fetchUserIssues,
        fetchTeamRepos
    }
})()
