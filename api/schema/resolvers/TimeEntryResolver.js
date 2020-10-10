const moment = require('moment')

module.exports = {

    TimeEntry: {
        contributor: (timeEntry, args, { models }) => {
            return models.Contributor.findByPk(timeEntry.contributor_id)

        },
        project: (timeEntry, args, { models }) => {
            return models.Project.findByPk(timeEntry.project_id)
        }
    },
    Query: {
        getTimeEntryById: (root, { id }, { models }) => {
            return models.TimeEntry.findByPk(timeEntry.project_id)
        },
        getTimeEntries: (root, args, { models }) => {
            return models.TimeEntry.findAll()
        },
        getProjectTimeEntriesByProjectId: (root, { projectId }, { models }) => {
            return models.TimeEntry.findAll({ where: { project_id: project_id } })
        }
    },
    Mutation: {
        createTimeEntry: async (root, {
            createFields,
            start_time
        }, { models }) => {
            return models.TimeEntry.create({
                ...createFields,
                start_time: moment(start_time, 'MM-DD-YYYY HH:mm:ss').utc()
            })
        },
        deleteTimeEntryById: async (root, { id }, { models }) => {
            return models.TimeEntry.destroy({ where: { id } })
        },
        upateTimeEntryById: async(root, {
            id,
            seconds,
            toggl_id,
            start_time,
            contributor_id,
            project_id
        }, { models }) => {
            return models.TimeEntry.update({
                seconds,
                toggl_id,
                start_time,
                contributor_id,
                project_id
            }, {
                where: {
                    id
                }
            })
        }
    }

}
