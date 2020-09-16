const toggl = require ('../handlers/toggl')

console.log('toggl');
console.log(toggl);
console.log('toggl.createTimeEntry()');
const timeEntries = toggl.fetchTimeEntries
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        new Error(err)
    })
