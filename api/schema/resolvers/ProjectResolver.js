const moment = require('moment')
const { Op, fn } = require('sequelize');
const sequelize = require('sequelize');

const { validateDatesFormat } = require('../helpers/inputValidation')

module.exports = {

    Project: {
        allocations: (project, args, { models }) => {
            return models.Allocation.findAll({ where: { project_id: project.id } })
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
        client: (project, args, { models }) => {
            return models.Client.findByPk(project.client_id)
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
                ]
            })
        },
        githubContributors: (project, arge, { models }) => {
            return models.Contributor.findAll({
                where: { 'github_id': { [Op.ne]: null } },
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
        issues: (project, args, { models }) => {
            return models.Issue.findAll({ where: { project_id: project.id } })
        },
        timeEntries: (project, { parameters }, { models }) => {
            const args = { ...parameters }
            validateDatesFormat({
                from_date: args.fromDate,
                to_date: args.toDate
            })
            return models.TimeEntry.findAll({
                where: {
                    project_id: project.id,
                    start_time: { [Op.between]: [
                        args.fromDate
                            ? args.fromDate
                            : moment.utc(1),
                        args.toDate
                            ? args.toDate
                            : moment.utc()
                    ] },
                    contributor_id: args.contributor_id
                        ? args.contributor_id
                        : { [Op.ne]: null }
                }
            })
        },
        timeSpent: (project, { parameters }, { models }) => {
            validateDatesFormat({
                fromDate: parameters.fromDate,
                toDate: parameters.toDate
            })
            return models.TimeEntry.findOne({
                attributes: [[fn('sum', sequelize.col('seconds')), 'seconds']],
                where: {
                    'project_id': project.id,
                    'contributor_id': parameters.contributor_id ? parameters.contributor_id : { [Op.ne]: null },
                    'start_time': { [Op.between]: [parameters.fromDate, parameters.toDate] }
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
