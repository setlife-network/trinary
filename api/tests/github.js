const { GITHUB } = require('../config/credentials')
const github = require('../handlers/github')

console.log('github');

const userData = github.fetchUserData({ auth_key: '' })
    .then(res => {
        console.log('res');
        console.log(res);
    })

const fetchRepos = github.fetchRepos({ auth_key: GITHUB.CLIENT_SECRET })
    .then(res => {
        console.log('fetchRepos res');
        console.log(res);
    })

// const userPermission = github.fetchUserPermission({
//     project_id:,
//     github_user:
// })
