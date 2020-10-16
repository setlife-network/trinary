const moment = require('moment')
const { UserInputError } = require('apollo-server')

module.exports = {

    Project: {
        client: (project, args, { models }) => {
            return models.Client.findByPk(project.client_id)
        },
        issues: (project, args, { models }) => {
            return models.Issue.findAll({ where: { project_id: project.id } })
        }
    },

    Query: {
        getProjectById: (root, { id }, { models }) => {
            return models.Project.findByPk(id)
        },
        getProjects: (root, args, { models }) => {
            return models.Project.findAll()
        }
    },
    Mutation: {
        createProject: (root, {
            createFields
        }, { models }) => {
            if (createFields['date']) createFields['date'] = moment(createFields['date'], 'YYYY-MM-DD', true).utc()
            if (createFields['date'] && !createFields['date'].isValid()) {
                throw new UserInputError('Date format invalid');
            }
            return models.Project.create({
                ...createFields
            })
        },
        deleteProjectById: (root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
        },
        updateProjectById: async (root, {
            id,
            updateFields
        }, { models }) => {
            var date = updateFields['date']
            if (date) date = moment(date, 'YYYY-MM-DD', true).utc()
            if (date && date.isValid()) throw new UserInputError('Date format invalid');
            updateFields['date'] = date
            await models.Project.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Project.findByPk(id)
        }
    }

}
