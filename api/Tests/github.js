const github = require('../handlers/github')

console.log('github');

const userData = github.fetchUserData({ auth_key: '' })
    .then(res => {
        console.log('res');
        console.log(res);
        resolve(res)
    })
