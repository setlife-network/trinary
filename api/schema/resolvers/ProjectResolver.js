const { validateDatesFormat } = require('../helpers/inputValidation')

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
