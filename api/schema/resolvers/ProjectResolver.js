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
            createFields,
            date
        }, { models }) => {
            date = moment(date, 'YYYY-MM-DD', true).utc()
            if (!date.isValid()) {
                throw new UserInputError('Date format invalid');
            }
            return models.Project.create({
                ...createFields,
                date
            })
        },
        deleteProjectById: (root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
        },
        updateProjectById: (root, {
            id,
            updateFields,
            date,
        }, { models }) => {
            if (date) date = moment(date, 'YYYY-MM-DD', true).utc()
            if (date && !date.isValid()) {
                throw new UserInputError('Date format invalid');
            }
            return models.Project.update({
                ...updateFields,
                date
            }, {
                where: {
                    id
                }
            })
        }
    }

}
