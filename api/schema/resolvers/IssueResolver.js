const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Issue: {
        project: async (issue, args, { models }) => {
            return models.Project.findByPk(issue.projectId)

        }
    },
    Query: {
        getIssueById: async (root, { id }, { models }) => {
            return models.Issue.findByPk(id)

        },
        getProjectIssuesByProjectId: async (root, { projectId }, { models }) => {
            return models.Issue.findAll({ where: { project_id: projectId } })

        }
    },
    Mutation: {
        createIssue: (root, {
            IssueInput
        }, { models }) => {
            return models.Issue.create({
                ...IssueInput
            })
        }
    }

}
