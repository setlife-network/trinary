const moment = require('moment')

const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Project: {
        async client (project, args, { models }) {
            return (
                models.Client.findByPk(project.clientId)
                    .then(res => {
                        return attributesMapping.clientMap(res)
                    })
            )
        },
        async issues (project, args, { models }) {
            return (
                models.Issue.findAll({ where: { project_id: project.id } })
                    .then(res => {
                        const issues = []
                        res.map(i => {
                            issues.push(attributesMapping.issueMap(i))
                        })
                        return issues
                    })
            )
        }
    },

    Query: {
        getProjectById(root, { id }, { models }) {
            return (
                models.Project.findByPk(id)
                    .then(res => {
                        return attributesMapping.projectMap(res)
                    })
            )
        },
        getProjects(root, args, { models }) {
            return (
                models.Project.findAll()
                    .then(res => {
                        const projects = []
                        res.map(p => {
                            projects.push(attributesMapping.projectMap(p))
                        })
                        return projects
                    })
            )
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
                date: new moment(date, 'MM-DD-YYYY HH:mm:ss').utc(),
                client_id
            })
        }
    }

}
