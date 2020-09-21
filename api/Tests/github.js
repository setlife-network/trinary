const github = require('../handlers/github')

console.log('github');

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

const userData = github.fetchUserData({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
    .then(res => {
        console.log('res');
        console.log(res);
    })
