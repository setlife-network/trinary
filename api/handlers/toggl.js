const TogglClient = require('toggl-api');
const {
    TOGGL
} = require('../../config/credentials')

var togglClient = new TogglClient({apiToken: TOGGL.API_KEY});


const toggl = module.exports = (() => {
    console.log('TOGGL.API_KEY');
    console.log(TOGGL.API_KEY);
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
