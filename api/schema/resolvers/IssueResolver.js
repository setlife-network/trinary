module.exports = {

    Issue: {
        async project (issue, args, { models }) {
            return models.Project.findByPk(issue.project_id)
        }
    },
    Query: {
        getIssueById(root, { id }, { models }) {
            return models.Issue.findByPk(id)
        },
        getProjectIssuesByProjectId(root, { projectId }, { models }) {
            return models.Issue.findAll({ where: { project_id: projectId } })
        }
    },
    Mutation: {
        createIssue: async(root, {
            github_url,
            project_id
        }, { models }) => {
            return models.Issue.create({
                github_url,
                project_id
            })
        },
        deleteIssueById: async ( root, { id }, { models }) => {
            return models.Issue.destroy({ where: { id } })
        }
    }

}
