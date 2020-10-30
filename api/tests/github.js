const github = require('../handlers/github')

console.log('github');

const githubFuncs = module.exports = ( githubFuncs => {
    const userData = github.fetchUserData({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
        .then(res => {
            console.log('res');
            console.log(res);
        })

    const fetchRepos = () => {
        const repos = github.fetchRepos({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
            .then( res => {
                console.log(res);
            })
    }
    const repoIssueInfo = (params) => {
        github.fetchRepoIssues({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98', owner: 'setlife-network', repo: 'project-trinary' })
            .then( res => {
                console.log('repoIssueInfo');
                console.log(res);
            })
            .catch(error => {
                console.log('error');
                console.log(error);
            })
    }
    return {
        userData,
        fetchRepos,
        repoIssueInfo
    }
})();
//MDEwOlJlcG9zaXRvcnkyNzg2NjA5NjI=
console.log('fetchRepos');
//console.log(githubFuncs.fetchRepos());
// console.log('repoIssueInfo');
// console.log(await githubFuncs.repoIssueInfo());

const res = githubFuncs.repoIssueInfo()
console.log('res');
console.log(res);
// .then(res => {
//     console.log('repoIssueInfo');
//     console.log(res);
// })
// .catch(error => {
//     console.log('error');
//     console.log(error);
// })
