const Date = require('../helpers/DateScalar')

module.exports = (() => {
    return {

        TimeEntry: {
            async contributor (timeEntry) {
                return timeEntry.getContributors()
            },
            async project (timeEntry) {
                return timeEntry.getProjects()
            }
        },

        Query: {
            getTimeEntry(root, { id }, { models }) {
                return models.TimeEntry.findBy(id)
            },
            getProjectTimeEntries(root, { models }) {
                return models.TimeEntry.findAll()
            }
        },

        Mutations: {
            createTimeEntry({
                seconds,
                togglId,
                startTime,
                contributorId,
                projectId
            }) {
                return models.TimeEntry.create({
                    seconds,
                    togglId,
                    startTime,
                    contributorId,
                    projectId
                })
            }
        }

    }
})
