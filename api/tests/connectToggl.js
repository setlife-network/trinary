const toggl = require ('../handlers/toggl')
const {
    TOGGL
} = require('../../config/credentials')

console.log('toggl');
console.log(toggl);
console.log('toggl.createTimeEntry()');
const timeEntries = toggl.fetchTimeEntries({accessToken: TOGGL.API_KEY})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        new Error(err)
    })
