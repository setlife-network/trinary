const moment = require('moment')
const { Op } = require('sequelize')

const { validateDatesFormat } = require('../helpers/inputValidation')

module.exports = {

    Project: {
        client: (project, args, { models }) => {
            return models.Client.findByPk(project.client_id)
        },
        issues: (project, args, { models }) => {
            return models.Issue.findAll({ where: { project_id: project.id } })
        },
        githubIssuesOpened: (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            return models.Issue.count({
                where: {
                    'project_id': project.id,
                    'created_at': {
                        [Op.between]: [
                            args.fromDate
                                ? args.fromDate
                                : moment.utc(1),
                            args.toDate
                                ? args.toDate
                                : moment.utc()
                        ]
                    }
                }
            })
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
            validateDatesFormat({
                date: createFields['date']
            })
            return models.Project.create({
                ...createFields
            })
        },
        deleteProjectById: (root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
        },
        updateProjectById: async (root, { id, updateFields }, { models }) => {
            validateDatesFormat({
                date: updateFields['date']
            })
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
