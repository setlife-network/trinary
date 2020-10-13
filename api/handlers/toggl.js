const TogglClient = require('toggl-api');
const {
    TOGGL
} = require('../config/credentials')

//var togglClient = new TogglClient({apiToken: TOGGL.API_KEY});

const toggl = module.exports = (() => {

    const fetchTimeEntries = (params) => {
        const togglClient = new TogglClient({ apiToken: params.accessToken });
        return new Promise((resolve, reject) => {
            togglClient.getTimeEntries((err, timeEntries) => {
                if (err) {
                    reject(err)
                }
                resolve(timeEntries)
            })
        })
    }

    return {
        fetchTimeEntries
    }

})();
