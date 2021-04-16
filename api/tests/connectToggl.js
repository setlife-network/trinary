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

//
// const ptojectData = toggl.fetchProjectData({ projectId:  })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })

// const workspaceData = toggl.fetchWorkspacesData({
//     wId:
// })
//     .then(res => {
//         console.log('res');
//         console.log(res);
//     })

const workspaceReport = toggl.fetchWorkspaceTimeEntries({
    wId: ,
    pId: ,
    since: '2020-01-01',
    until: '2020-11-12'
})
    .then(res => {
        console.log('report');
        console.log(res);
    })

// const workspaceProjects = toggl.fetchWorkspacesProject({
//     wId: 
// })
//     .then(res => {
//         console.log('projects');
//         console.log(res);
//     })
