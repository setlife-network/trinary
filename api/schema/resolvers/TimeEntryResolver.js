const { validateDateFormat } = require('../helpers/inputValidation')

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
        getProjectTimeEntriesByProjectId: (root, { project_id }, { models }) => {
            return models.TimeEntry.findAll({ where: { project_id } })
        }
    },
    Mutation: {
        createTimeEntry: (root, { createFields }, { models }) => {
            validateDateFormat({
                start_time: createFields['start_time']
            })
            return models.TimeEntry.create({
                ...createFields
            })
        },
        deleteTimeEntryById: (root, { id }, { models }) => {
            return models.TimeEntry.destroy({ where: { id } })
        },
        upateTimeEntryById: async (root, { id, updateFields }, { models }) => {
            validateDateFormat({
                start_time: updateFields['start_time']
            })
            await models.TimeEntry.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.TimeEntry.findByPk(id)
        }
    }

}
