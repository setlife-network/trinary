const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Issue: {
        project: async (issue, args, { models }) => {
            return models.Project.findByPk(issue.project_id)

        }
    },
    Query: {
        getIssueById: async (root, { id }, { models }) => {
            return models.Issue.findByPk(id)

        },
        getProjectIssuesByProjectId: async (root, { projectId }, { models }) => {
            return models.Issue.findAll({ where: { project_id: project_id } })

        }
    },
    Mutation: {
        createIssue: (root, {
            createFields
        }, { models }) => {
            return models.Issue.create({
                ...createFields
            })
        }
    }

}
