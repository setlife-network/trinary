const moment = require('moment')
const sequelize = require('sequelize');
const { ApolloError } = require('apollo-server')
const { col, fn, Op } = require('sequelize');
const { split } = require('lodash')

const { TOGGL } = require('../../config/credentials');
const github = require('../../handlers/github')
const toggl = require('../../handlers/toggl')
const { validateDatesFormat } = require('../helpers/inputValidation')
const { dataSyncs } = require('../../modules')
const apiModules = require('../../modules');

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
                            project_id: project.id
                        }
                    }
                ]
            })
        },
        averageHourlyPaid: async (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const totalAllocatedMoney = await models.Allocation.sum(
                'amount',
                {
                    where: {
                        project_id: project.id,
                        date_paid: {
                            [Op.and]: [
                                { [Op.ne]: null },
                                { [Op.between]: [
                                    args.fromDate
                                        ? args.fromDate
                                        : moment.utc(1),
                                    args.toDate
                                        ? args.toDate
                                        : moment.utc()
                                ] }
                            ]
                        }
                    }
                }
            ) || 0
            const totalHours = await models.TimeEntry.sum(
                'seconds',
                {
                    where: {
                        project_id: project.id
                    }
                }
            ) / 3600

            //the averageHourlyPaid is returned in cents
            return parseInt(totalAllocatedMoney / totalHours, 10)
        },
        averageIssueCost: async (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const dateCondition = {
                [Op.between]: [
                    args.fromDate
                        ? args.fromDate
                        : moment.utc(1),
                    args.toDate
                        ? args.toDate
                        : moment.utc()
                ]
            }
            const totalPaidFromClient = await models.Payment.sum(
                'Payment.amount',
                {
                    where: {
                        date_paid: {
                            [Op.and]: [
                                { [Op.ne]: null },
                                dateCondition
                            ]
                        }
                    },
                    include: [
                        {
                            model: models.Allocation,
                            where: {
                                project_id: project.id
                            }
                        }
                    ],
                }
            ) || 0
            const totalPaidFromAllocation = await models.Allocation.sum(
                'amount',
                {
                    where: {
                        project_id: project.id,
                        date_paid: {
                            [Op.and]: [
                                { [Op.ne]: null },
                                dateCondition
                            ]
                        }
                    }
                }
            ) || 0
            const totalIssues = await models.Issue.count(
                {
                    where: {
                        project_id: project.id,
                        created_at: dateCondition,
                    }
                }
            ) || 0
            return {
                fromPayments: parseInt( totalPaidFromClient / totalIssues, 10),
                fromAllocations: parseInt(totalPaidFromAllocation / totalIssues, 10)
            }
        },
        client: async (project, args, { models }) => {
            return models.Client.findByPk(project.client_id)
        },
        contributors: (project, args, { models }) => {
            return models.Contributor.findAll({
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            project_id: project.id
                        }
                    }
                ]
            })
        },
        githubContributors: (project, args, { models }) => {
            return models.Contributor.findAll({
                where: { github_id: { [Op.ne]: null } },
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            project_id: project.id
                        }
                    }
                ]
            })
        },
        issues: (project, args, { models }) => {
            return models.Issue.findAll({ where: { project_id: project.id } })
        },
        permissions: (project, args, { models }) => {
            return models.Permission.findAll({
                where: {
                    project_id: project.id
                }
            })
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
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            return models.TimeEntry.findAll({
                where: {
                    project_id: project.id,
                    start_time: {
                        [Op.between]: [
                            args.fromDate
                                ? args.fromDate
                                : moment.utc(1),
                            args.toDate
                                ? args.toDate
                                : moment.utc()
                        ]
                    },
                    contributor_id: args.contributor_id
                        ? args.contributor_id
                        : { [Op.ne]: null }
                }
            })
        },
        timeSpentPerContributor: (project, args, { models }) => {
            return models.TimeEntry.findAll(
                {
                    where: {
                        project_id: project.id
                    },
                    group: 'contributor_id',
                    attributes: ['contributor_id', [fn('sum', col('seconds')), 'seconds']]
                }
            )

        },
        issuesOpened: (project, args, { models }) => {
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
        },
        timeSpent: (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const whereConditions = {
                project_id: project.id,
                start_time: { [Op.between]: [args.fromDate ? args.fromDate : moment.utc(1), args.toDate ? args.toDate : moment.utc()] }
            }
            if (args.contributor_id) {
                whereConditions.contributor_id = args.contributor_id
            }

            return models.TimeEntry.findOne({
                // The sum gets returned with the property name "seconds"
                attributes: [[fn('sum', col('seconds')), 'seconds']],
                where: whereConditions
            })
        },
        totalPaid: async (project, args, { models }) => {
            validateDatesFormat({
                fromDate: args.fromDate,
                toDate: args.toDate
            })
            const total = await models.Payment.findOne({
                attributes: [[fn('sum', col('amount')), 'totalPaid']],
                where: {
                    date_paid: {
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
                            project_id: project.id
                        }
                    }
                ],
            })
            return total
                ? total.dataValues.totalPaid
                : 0
        }
    },
    timeSpentPerContributor: {
        contributor: (timeSpentPerContributor, args, { models }) => {
            return models.Contributor.findOne(
                {
                    where: {
                        id: timeSpentPerContributor.contributor_id
                    }
                }
            )
        }
    },
    Query: {
        getProjectById: (root, { id }, { models }) => {
            return models.Project.findByPk(id)
        },
        getProjects: (root, args, { models }) => {
            return models.Project.findAll()
        },
        getActiveProjectsCount: (root, args, { models }) => {
            const whereFields = {
                is_active: true
            }
            if (args.clientId) whereFields.client_id = args.clientId
            return models.Project.count({
                where: {
                    ...whereFields
                }
            })
        }
    },
    Mutation: {
        createProject: (root, { createFields }, { models }) => {
            validateDatesFormat({
                date: createFields['date']
            })
            const createData = {
                ...createFields
            }
            if (createFields.toggl_url) {
                //get toggleId from togglUrl
                const togglArray = split(createFields.toggl_url, '/')
                const togglId = togglArray[togglArray.length - 1]
                createData['toggl_id'] = togglId
            }
            return models.Project.create({
                ...createData
            })
        },
        deleteProjectById: (root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
        },
        syncProjectPermissions: async (root, { project_id }, { models }) => {
            const project = await models.Project.findByPk(project_id)
            const projectContributors = await models.Contributor.findAll({
                raw: true,
                include: [
                    {
                        model: models.Allocation,
                        where: {
                            project_id: project.id
                        }
                    }
                ]
            })
            return dataSyncs.syncProjectCollaboratorsPermission({
                project_id: project_id,
                github_url: project.github_url,
                contributors: projectContributors
            })
        },
        syncTogglProject: async (root, args, { models }) => {
            let project = await models.Project.findByPk(args.project_id)
            if (!TOGGL.API_KEY) {
                return new ApolloError('You need to setup a Toggl API KEY on the .env file', 2001)
            }
            if (!args.toggl_id && !project.toggl_id) {
                return new ApolloError('You need to provide a toggl project id', 2001)
            } else if (args.toggl_id) {
                //check if project exists
                try {
                    await toggl.fetchProjectData({ projectId: args.toggl_id })
                } catch (err) {
                    return new ApolloError(`That toggl_id project doesen't exists`, 2002)
                }
                //update toggl_id
                await models.Project.update({
                    toggl_id: args.toggl_id
                }, {
                    where: {
                        id: args.project_id
                    }
                });
                //get updated project
                project = await models.Project.findByPk(args.project_id)
            }
            //search for the date of the last sync to fetch since taht date
            const lastEntrySynced = await models.TimeEntry.findOne({
                order: [['created_at', 'DESC']]
            })
            const dataSync = await apiModules.dataSyncs.syncTogglProject({
                toggl_project_id: project.toggl_id,
                project_id: project.id,
                since: lastEntrySynced
                    ? lastEntrySynced.created_at
                    : moment().subtract(1, 'y').format('YYYY-MM-DD')
            })
            if (dataSync) {
                return project
            } else {
                return new ApolloError('Something wrong happened', 2003)
            }
        },
        syncProjectIssues: async (root, { project_id }, { models }) => {
            const project = await models.Project.findByPk(project_id)
            const syncedIssues = await apiModules.dataSyncs.syncGithubIssues({
                project_id,
                github_url: project.github_url,
            })
            await models.Project.update({
                date_last_synced: moment.utc()
            }, {
                where: {
                    id: project_id
                }
            })
            return syncedIssues
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
