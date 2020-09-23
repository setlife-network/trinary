const github = require('../handlers/github')

console.log('github');

const userData = github.fetchUserData({ auth_key: '1285b9d9dd6a5380008287218be71afa65cd0a98' })
    .then(res => {
        console.log('res');
        console.log(res);
    })
