const moment = require('moment')
const sequelize = require('sequelize');
const { col, fn, Op } = require('sequelize');
const { split } = require('lodash')

const github = require('../../handlers/github')
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
        githubContributors: (project, args, { models }) => {
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

        githubIssuesOpened: async (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const urlSplitted = split(project.github_url, '/');
            const issues = await github.fetchRepoIssues({
                repo: url[urlSplitted.length - 1]
            })
            let openIssues = 0
            issues.map((i, n) => {
                //check is the issue is not a pull request &&
                //check if is not closed &&
                // check the date ranges
                if (
                    i.pull_request == null &&
                    i.closed_at == null &&
                    moment(i.created_at).isAfter(args.fromDate
                        ? args.fromDate
                        : moment(1)) &&
                    moment(i.created_at).isBefore(args.toDate
                        ? args.toDate
                        : moment())
                ) {
                    openIssues += 1
                }
            })
            return openIssues
        },
        githubIssuesClosed: async (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const urlSplitted = split(project.github_url, '/');
            const issues = await github.fetchRepoIssues({
                repo: url[urlSplitted.length - 1]
            })
            let closedIssues = 0
            issues.map((i, n) => {
                //check is the issue is not a pull request &&
                //check if is closed &&
                // check the date ranges
                if (
                    i.pull_request == null &&
                    i.closed_at &&
                    moment(i.closed_at).isAfter(args.fromDate
                        ? args.fromDate
                        : moment(1)) &&
                    moment(i.closed_at).isBefore(args.toDate
                        ? args.toDate
                        : moment())
                ) {
                    closedIssues += 1
                }
            })
            return closedIssues
        },
        timeEntries: (project, args, { models }) => {
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
        timeSpent: (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })

            const whereConditions = {
                'project_id': project.id,
                'start_time': { [Op.between]: [args.fromDate, args.toDate] }
            }
            if (args.contributor_id) {
                whereConditions.contributor_id = args.contributor_id
            }

            return models.TimeEntry.findOne({
                // The sum gets returned with the property name "seconds"
                attributes: [[fn('sum', sequelize.col('seconds')), 'seconds']],
                where: whereConditions
            })
        },
        totalPaid: async (project, args, { models }) => {
            const total = await models.Payment.findOne({
                attributes: [[fn('sum', col('amount')), 'totalPaid']],
                where: {
                    'date_paid': {
                        [Op.and]: [
                            { [Op.ne]: null },
                            {
                                [Op.between]: [
                                    args.fromDate
                                        ? args.fromDate
                                        : moment.utc(1),
                                    args.toDate
                                        ? args.toDate
                                        : moment.utc()
                                ]
                            }
                        ]
                    },
                },
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            'project_id': project.id
                        }
                    }
                ],
            })
            return total
                ? total.dataValues.totalPaid
                : 0
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
