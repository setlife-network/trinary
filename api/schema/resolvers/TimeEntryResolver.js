const moment = require('moment')

module.exports = {

    TimeEntry: {
        async contributor (timeEntry, args, { models }) {
            return models.Contributor.findByPk(timeEntry.contributor_id)
        },
        async project (timeEntry, args, { models }) {
            return models.Project.findByPk(timeEntry.project_id)
        }
    },

    Query: {
        timeEntry(root, { id }, { models }) {
            return models.TimeEntry.findByPk(id)
        },
        timeEntries(root, args, { models }) {
            return models.TimeEntry.findAll()
        },
        projectTimeEntries(root, { projectId }, { models }) {
            return models.TimeEntry.findAll({ where: { project_id: projectId } })
        }
    },

    Mutation: {
        createTimeEntry: async (root, {
            seconds,
            toggl_id,
            start_time,
            contributor_id,
            project_id
        }, { models }) => {
            return models.TimeEntry.create({
                seconds,
                toggl_id,
                start_time: moment(start_time, 'YYYY-MM-DD'),
                contributor_id,
                project_id
            })
        }
    }

}
