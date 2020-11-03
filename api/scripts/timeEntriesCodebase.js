const db = require('../models')

module.exports = (() => {

    const matchingTimeEntries = async (timeEntry) => {
        return db.models.TimeEntry.findOne({
            where: {
                toggl_id: timeEntry.id
            }
        })
    }

    const addTimeEntries = (params) => {

        params.timeEntries.map(async t => {
            if (!(await matchingTimeEntries(t))) {
                await db.models.TimeEntry.create({
                    seconds: t.duration,
                    start_time: t.start,
                    toggl_id: t.id,
                    contributor_id: 1,
                    project_id: params.projectId,
                })
            }
        })

    }

    return {
        addTimeEntries
    }
})();
