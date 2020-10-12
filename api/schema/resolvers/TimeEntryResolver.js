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
        createTimeEntry: (root, {
            createFields,
            start_time
        }, { models }) => {
            const startTimeUTC = moment(start_time, 'YYYY-MM-DD', true).utc()
            if (!startTimeUTC.isValid()) {
                throw new UserInputError('Date format invalid');
            }
            return models.TimeEntry.create({
                ...createFields,
                start_time: moment(start_time, 'MM-DD-YYYY HH:mm:ss').utc()
            })
        },
        deleteTimeEntryById: (root, { id }, { models }) => {
            return models.TimeEntry.destroy({ where: { id } })
        },
        upateTimeEntryById: (root, {
            id,
            updateFields,
            start_time
        }, { models }) => {
            const startTimeUTC = moment(start_time, 'YYYY-MM-DD', true).utc()
            if (start_time && !startTimeUTC.isValid()) {
                throw new UserInputError('Date format invalid');
            }
            return models.TimeEntry.update({
                ...updateFields,
                start_time: moment(start_time, 'MM-DD-YYYY HH:mm:ss').utc()
            }, {
                where: {
                    id
                }
            })
        }
    }

}
