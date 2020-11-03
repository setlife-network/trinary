const toggl = require('../handlers/toggl')

console.log('toggl');
console.log(toggl);
console.log('toggl.fetchProjectData');
console.log('toggl.createTimeEntry()');
const fetchProjectData = toggl.fetchProjectData({ projectId:  })
    .then(res => {
        console.log('res');
        console.log(res);
    })
    .catch(err => {
        console.log('error ', err);
    })
// console.log('toggl.createTimeEntry()');
// const timeEntries = toggl.fetchTimeEntries({ accessToken: TOGGL.API_KEY })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         new Error(err)
//     })
