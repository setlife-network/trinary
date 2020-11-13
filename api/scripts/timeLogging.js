const db = require('../models')

module.exports = (() => {

    const matchingTimeEntry = async (timeEntry) => {
        return db.models.TimeEntry.findOne({
            where: {
                toggl_id: timeEntry.id
            }
        })
    }

    const addTimeEntries = (params) => {
        return Promise.all(
            params.timeEntries.map(async t => {
                if (!(await matchingTimeEntry(t))) {
                    await db.models.TimeEntry.create({
                        seconds: t.duration,
                        start_time: t.start,
                        toggl_id: t.id,
                        contributor_id: 1,
                        project_id: params.projectId,
                    })
                }
            })
        )
    }

    return {
        addTimeEntries
    }
})();
