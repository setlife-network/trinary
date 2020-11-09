const github = require('../handlers/github')

console.log('github');

const githubFuncs = module.exports = (() => {

    const userData = github.fetchUserData({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
        .then(res => {
            console.log('res');
            console.log(res);
        })

    const fetchRepos = github.fetchRepos({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
        .then(res => {
            console.log('repos')
            console.log(res);
        })
    const fetchRepoIssues = github.fetchRepoIssues({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98', repo_id: 278660962 })
        .then(res => {
            console.log('issues');
            console.log(res);
        })

    return {
        userData,
        fetchRepos,
        fetchRepoIssues
    }

})();

console.log('userData');
console.log(githubFuncs.userData);
console.log('fetchRepos');
console.log(githubFuncs.fetchRepos);
console.log('githubFuncs.fetchRepoIssues');
console.log(githubFuncs.fetchRepoIssues);
