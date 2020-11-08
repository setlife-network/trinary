const moment = require('moment')
const { col, fn, Op } = require('sequelize');
const { ApolloError } = require('apollo-server')
const { split } = require('lodash')

const { TOGGL } = require('../../config/credentials');
const { validateDatesFormat } = require('../helpers/inputValidation')
const apiModules = require('../../modules');
const toggl = require('../../handlers/toggl')

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
                attributes: [[fn('sum', col('seconds')), 'seconds']],
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
            //get toggleId from togglUrl
            const togglArray = split(createFields.toggl_url, '/')
            const togglId = togglArray[togglArray.length - 1]
            return models.Project.create({
                toggl_id: togglId,
                ...createFields
            })
        },
        deleteProjectById: (root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
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

            const dataSync = await apiModules.dataSyncs.syncTogglProject({
                togglProjectId: project.toggl_id,
                projectId: project.id
            })
            if (dataSync == 'Success') {
                return project
            } else {
                return new ApolloError('Something wrong happened', 2003)
            }
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
