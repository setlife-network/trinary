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

    const fetchTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY })
        return new Promise((resolve, reject) => {
            togglClient.getTimeEntries((err, timeEntries) => {
                if (err) {
                    reject(err)
                }
                resolve(timeEntries)
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
        fetchProjectData,
        fetchProjectTimeEntries,
        fetchTimeEntries,
        fetchUserData
    }

})();
