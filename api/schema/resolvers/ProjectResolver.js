const moment = require('moment')

module.exports = {

    Project: {
        async client (project, args, { models }) {
            return models.Client.findByPk(project.client_id)
        },
        async issues (project, args, { models }) {
            return models.Issue.findAll({ where: { project_id: project.id } })
        }
    },

    Query: {
        getProjectById(root, { id }, { models }) {
            return models.Project.findByPk(id)
        },
        getProjects(root, args, { models }) {
            return models.Project.findAll()
        }
    },

    Mutation: {
        createProject: async(root, {
            expected_budget,
            is_active,
            name,
            github_url,
            date,
            client_id
        }, { models }) => {
            return models.Project.create({
                expected_budget,
                is_active,
                name,
                github_url,
                date: moment(date, 'YYYY-MM-DD'),
                client_id
            })
        },
        deleteProjectById: async ( root, { id }, { models }) => {
            return models.Project.destroy({ where: { id } })
        }
    }

}
