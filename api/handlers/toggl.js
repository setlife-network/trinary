const TogglClient = require('toggl-api');
const {
    TOGGL
} = require('../config/credentials')

//var togglClient = new TogglClient({apiToken: TOGGL.API_KEY});

const toggl = module.exports = (() => {

    const fetchTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY });
        return new Promise((resolve, reject) => {
            togglClient.getTimeEntries((err, timeEntries) => {
                if (err) {
                    reject(err)
                }
                resolve(timeEntries)
            })
        })
    }

    const fetchProjectTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: TOGGL.API_KEY });
        return new Promise((resolve, reject) => {
            togglClient.getTimeEntries((err, timeEntries) => {
                let projectTimeEntries = []
                if (timeEntries) {
                    timeEntries.map(t => {
                        if (t.pid == params.projectId) {
                            return projectTimeEntries.push(t)
                        }
                    })
                    resolve(projectTimeEntries)
                }
                reject(err)
            })
        })
    }

    return {
        fetchTimeEntries,
        fetchProjectData
    }

})();
