const Date = require('../helpers/DateScalar')

module.exports = (() => {
    return {
        Project: {
            async client (payment) {
                return project.getClients()
            }
        },
        Query: {
            getProject(root, { id }, { models }) {
                return models.Project.findBy(id)
            },
            getProjectClient(root, { projectId }, { models }) {
                return models.Client.findOne({ where: { project_id: projectId } })
            }
        },
        Mutation: {
            createProject: async(root, {
                expected_budget,
                is_active,
                name,
                github_url,
                date,
                clientId
            }) => {
                return models.Issue.create({
                    expected_budget,
                    is_active,
                    name,
                    github_url,
                    date,
                    clientId
                })
            }
        }
    }
})
