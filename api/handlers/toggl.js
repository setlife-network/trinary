const TogglClient = require('toggl-api');
const {
    TOGGL
} = require('../../config/credentials')

var togglClient = new TogglClient({apiToken: `3502210cbe890bdb7c42c1d5ede87713`});


const toggl = module.exports = (() => {

    const fetchTimeEntries = new Promise((resolve, reject) => {
        togglClient.getTimeEntries((err, timeEntries) => {
            if (err){
                reject(err)
            }
            resolve(timeEntries)
        })
    })


    return {
        fetchTimeEntries
    }

})();
