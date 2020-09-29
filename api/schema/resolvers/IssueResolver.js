const sequelize = require('sequelize')

const Date = require('../helpers/DateScalar')

module.exports = {

    Issue: {
        async project (issue, args, { models }) {
            return models.Project.findByPk(issue.project_id)
        }
    },

    Query: {
        issue(root, { id }, { models }) {
            return models.Issue.findByPk(id)
        },
        projectIssues(root, { projectId }, { models }) {
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
        }
    }

}
