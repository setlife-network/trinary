const db = require('../models')

module.exports = (() => {

    const matchTimeEntry = async (timeEntry) => {
        const match = await db.models.TimeEntry.findOne({
            where: {
                toggl_id: timeEntry.id
            }
        })
        return match
    }

    const matchContributor = (timeEntry) => {
        return db.models.Contributor.findOne({
            where: {
                toggl_id: timeEntry.uid
            }
        })
    }

    const addTimeEntries = (params) => {
        let contributor
        return Promise.all(params.timeEntries.map(async t => {
            if (!(await matchTimeEntry(t))) {
                contributor = await matchContributor(t)
                if (contributor) {
                    const time = await db.models.TimeEntry.create({
                        seconds: t.dur / 1000,
                        toggl_id: t.id,
                        start_time: t.start,
                        description: t.description || null,
                        contributor_id: contributor.id,
                        project_id: params.project_id,
                    })
                }
            }
        }))
    }

    return {
        addTimeEntries
    }
})();
