const db = require('../models')

module.exports = (() => {

    const matchingTimeEntries = async (timeEntry) => {
        return db.models.findOne({
            where: {
                toggl_id: timeEntry.id
            }
        })
    }

    const addTimeEntries = (timeEntries, projectId) => {

        timeEntries.map(async t => {

            if (!this.matchingTimeEntries(t)) {
                await db.models.timeEntries.create({
                    secods: t.duration,
                    toggl_id: t.id,
                    contribuitor_id: 1,
                    project_id: projectId,
                })
            }

        })

    }

    return {
        addTimeEntries
    }
})();
