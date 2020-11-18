const toggl = require('../handlers/toggl')

console.log('toggl');
console.log(toggl);
console.log('toggl.fetchProjectData');
console.log('toggl.createTimeEntry()');
// const fetchProjectData = toggl.fetchProjectTimeEntries({ projectId:  })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })
//     .catch(err => {
//         console.log('error ', err);
//     })
// const fetchData = async() => {
//     return toggl.fetchProjectData({ projectId:  })
// }
// const projectData = await toggl.fetchProjectData({ projectId:  })

// const timeEntries = toggl.fetchTimeEntries({ accessToken: TOGGL.API_KEY })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         Error(err)
//     })

// const ptojectData = toggl.fetchProjectData({ projectId:  })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })

const userData = toggl.fetchUserData()
    .then(res => {
        console.log('res');
        console.log(res);
    })
