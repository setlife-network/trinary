const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    TimeEntry: {
        async contributor (timeEntry, args, { models }) {
            return (
                models.Contributor.findByPk(timeEntry.contributorId)
                    .then(res => {
                        return attributesMapping.contributorMap(res)
                    })
            )
        },
        async project (timeEntry, args, { models }) {
            return (
                models.Project.findByPk(timeEntry.projectId)
                    .then(res => {
                        return attributesMapping.projectMap(res)
                    })
            )
        }
    },
    Query: {
        getTimeEntryById(root, { id }, { models }) {
            return (
                models.TimeEntry.findByPk(timeEntry.project_id)
                    .then(res => {
                        return attributesMapping.timeEntryMap(res)
                    })
            )
        },
        getTimeEntries(root, args, { models }) {
            return (
                models.TimeEntry.findAll()
                    .then(res => {
                        const timeEntries = []
                        res.map(t => {
                            timeEntries.push(attributesMapping.timeEntryMap(t))
                        })
                        return timeEntries
                    })
            )
        },
        getProjectTimeEntriesByProjectId(root, { projectId }, { models }) {
            return (
                models.TimeEntry.findAll({ where: { project_id: projectId } })
                    .then(res => {
                        const timeEntries = []
                        res.map(t => {
                            timeEntries.push(attributesMapping.timeEntryMap(t))
                        })
                        return timeEntries
                    })
            )
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
