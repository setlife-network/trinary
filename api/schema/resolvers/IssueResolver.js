module.exports = {

    Issue: {
        project: async (issue, args, { models }) => {
            return models.Project.findByPk(issue.project_id)
        },
        contributions: (issue, args, { models }) => {
            return models.Contribution.findAll({ where: { issue_id: issue.id } })
        }
    },
    Query: {
        getIssueById: async (root, { id }, { models }) => {
            return models.Issue.findByPk(id)

        },
        getIssuesByProjectId: async (root, { project_id }, { models }) => {
            return models.Issue.findAll({ where: { project_id } })

        }
    },
    Mutation: {
        createIssue: (root, { createFields }, { models }) => {
            return models.Issue.create({
                ...createFields
            })
        },
        deleteIssueById: (root, { id }, { models }) => {
            return models.Issue.destroy({ where: { id } })
        },
        updateIssueById: async (root, { id, updateFields }, { models }) => {
            await models.Issue.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Issue.findByPk(id)
        }
    }

}
