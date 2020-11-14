const TogglClient = require('toggl-api');
const {
    TOGGL
} = require('../config/credentials')

const toggl = module.exports = (() => {

    const fetchProjectData = async (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        return new Promise((resolve, reject) => {
            togglClient.getProjectData(params.projectId, (err, projectData) => {
                if (projectData) {
                    resolve(projectData)
                }
                reject(err)
            })
        })
    }
    //use fetchWorkspaceTimeEntries instead
    const fetchProjectTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        return new Promise((resolve, reject) => {
            togglClient.getTimeEntries(async (err, timeEntries) => {
                let projectTimeEntries = []
                if (timeEntries) {
                    await timeEntries.map(t => {
                        if (t.pid == params.projectId) {
                            projectTimeEntries.push(t)
                        }
                    })
                    resolve(projectTimeEntries)
                }
                reject(err)
            })
        })
    }

    const fetchWorkspacesProject = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        return new Promise((resolve, reject) => {
            togglClient.getWorkspaceProjects(params.wId, (err, projects) => {
                if (err) {
                    reject(err)
                }
                resolve(projects)
            })
        })
    }

    const fetchWorkspacesData = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        return new Promise((resolve, reject) => {
            togglClient.getWorkspaceData(params.wId, (err, workspaces) => {
                if (err) {
                    reject(err)
                }
                resolve(workspaces)
            })
        })
    }

    const fetchWorkspaceTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        const opts = {
            user_agent: 'oscar@setlife.network',
            workspace_id: params.wId,
            project_ids: params.pId,
            since: params.since,
            until: params.until
        }
        return new Promise( (resolve, reject) => {
            togglClient.detailedReport(opts, (err, report) => {
                if (err) {
                    reject(err)
                }
                if (report) {
                    resolve(report.data)
                } else {
                    reject(new Error('Not time entries to sync'))
                }
            })
        })
    }

    const fetchUserData = (params) => {
        const togglClient = new TogglClient({ apiToken: params.apiToken });
        return new Promise((resolve, reject) => {
            togglClient.getUserData((since = 0), (err, userData) => {
                if (err) {
                    reject(err)
                }
                resolve(userData)
            })
        })
    }

    return {
        fetchUserData,
        fetchProjectData,
        fetchProjectTimeEntries,
        fetchWorkspacesData,
        fetchWorkspacesProject,
        fetchWorkspaceTimeEntries,
    }

})();
