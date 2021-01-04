const { GITHUB } = require('../config/credentials')
const github = require('../handlers/github')

console.log('github');

// const userData = github.fetchAuthUserData({ auth_key: '' })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })
//
// const fetchRepos = github.fetchRepos({ auth_key: GITHUB.CLIENT_SECRET })
//     .then(res => {
//         console.log('fetchRepos res');
//         console.log(res);
//     })

const userPermission = github.fetchRepoContributors({
    auth_key: GITHUB.CLIENT_SECRET,
    owner: 'setlife-network',
    repo: 'project-trinary'
})
    .then(res => {
        console.log('res');
        console.log(res);

    })
    .catch(err => {
        console.log('err');
        console.log(err);
    })
