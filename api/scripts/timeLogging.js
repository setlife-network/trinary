const db = require('../models')

module.exports = (() => {

    const matchTimeEntry = async (timeEntry) => {
        return db.models.TimeEntry.findOne({
            where: {
                toggl_id: timeEntry.id
            }
        })
    }

    const matchContributor = (timeEntry) => {
        return db.models.Contributor.findOne({
            where: {
                toggl_id: timeEntry.uid
            }
        })
    }

    const addTimeEntries = (params) => {
        return Promise.all(params.timeEntries.map(async t => {
            if (!(await matchTimeEntry(t))) {
                const contributor = await matchContributor(t)
                await db.models.TimeEntry.create({
                    seconds: t.duration,
                    start_time: t.start,
                    toggl_id: t.id,
                    contributor_id: contributor.id,
                    project_id: params.projectId,
                })
            }
        }))
    }

    return {
        addTimeEntries
    }
})();
