const { GITHUB } = require('../config/credentials')
const github = require('../handlers/github')

console.log('github');

// const userData = github.fetchUserData({ auth_key: '' })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })

// const fetchRepos = github.fetchRepos({ auth_key: '' })
//     .then(res => {
//         // console.log('fetchRepos res');
//         console.log(res);
//         res.data.map(r => {
//             console.log(r.owner);
//         })
//     })

// const userPermission = github.fetchUserPermission({
//     auth_key: GITHUB.CLIENT_SECRET,
//     owner: 'setlife-network',
//     repo: 'project-trinary',
//     username: 'otech47'
// })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//
//     })
//     .catch(err => {
//         console.log('err');
//         console.log(err);
//     })

// const repoInfo = github.fetchRepoInfo(
//     {
//         auth_key: '',
//         owner: 'setlife-network',
//         repo: 'project-trinary'
//     }
// )
//     .then(res => {
//         console.log('res');
//         console.log(res.data);
//     })
//     .catch(err => {
//         console.log('err');
//         console.log(err);
//     })

const repoontributors = github.fetchRepoContributors(
    {
        auth_key: '',
        owner: 'setlife-network',
        repo: 'project-trinary'
    }
)
    .then(res => {
        console.log('res');
        console.log(res.data);
    })
    .catch(err => {
        console.log('err');
        console.log(err);
    })
