const moment = require('moment')
const { Op } = require('sequelize');

const { validateDatesFormat } = require('../helpers/inputValidation')

module.exports = {

    Project: {
        client: (project, args, { models }) => {
            return models.Client.findByPk(project.client_id)
        },
        issues: (project, args, { models }) => {
            return models.Issue.findAll({ where: { project_id: project.id } })
        },
        contributors: (project, args, { models }) => {
            return models.Contributor.findAll({
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            'project_id': project.id
                        }
                    }
                ],
            })
        },
        allocatedPayments: (project, args, { models }) => {
            return models.Payment.findAll({
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            'project_id': project.id
                        }
                    }
                ]
            })
        },
        timeEntries: (project, { parameters }, { models }) => {
            const args = { ...parameters }
            validateDatesFormat({
                from_date: args.from_date,
                to_date: args.to_date
            })
            return models.TimeEntry.findAll({
                where: {
                    project_id: project.id,
                    start_time: { [Op.between]: [
                        args.from_date
                            ? args.from_date
                            : moment.utc(1),
                        args.to_date
                            ? args.to_date
                            : moment.utc()
                    ] },
                    contributor_id: args.contributor_id
                        ? args.contributor_id
                        : { [Op.ne]: null }
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
        createProject: (root, { createFields }, { models }) => {
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
