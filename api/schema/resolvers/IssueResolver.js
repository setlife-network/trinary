const attributesMapping = require('../helpers/attributesMapping')

module.exports = {

    Issue: {
        async project (issue, args, { models }) {
            return (
                models.Project.findByPk(issue.projectId)
                    .then(res => {
                        return attributesMapping.projectMap(res)
                    })
            )
        }
    },
    Query: {
        getIssueById(root, { id }, { models }) {
            return (
                models.Issue.findByPk(id)
                    .then(res => {
                        return attributesMapping.issueMap(res)
                    })
            )
        },
        getProjectIssuesByProjectId(root, { projectId }, { models }) {
            return (
                models.Issue.findAll({ where: { project_id: projectId } })
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
    Mutation: {
        createIssue: async(root, {
            github_url,
            project_id
        }, { models }) => {
            return models.Issue.create({
                github_url,
                project_id
            })
        }
    }

}
