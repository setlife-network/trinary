const github = require('../handlers/github')

console.log('github');
console.log(github);
console.log(github.fetchGithubTeamData);

// github.fetchGithubTeamData({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
//     .then(response => {
//         console.log('response');
//         console.log(response);
//     })

// github.fetchGithubTeamRepos({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
//     .then(response => {
//         console.log('user repos');
//         console.log(response);
//     })

github.fetchUserIssues({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
    .then(response => {
        console.log('user issues');
        console.log(response);
    })
