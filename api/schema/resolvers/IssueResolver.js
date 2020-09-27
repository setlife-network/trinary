const sequelize = require('sequelize')

const Date = require('../helpers/DateScalar')

module.exports = (() => {
    return {
        Issue: {
            async project (issue) {
                return issue.getProjects()
            }
        },
        Query: {
            getIssue(root, { id }, { models }) {
                return models.Issue.findBy(id)
            },
            getProjectIssues(root, { projectId }, { models }) {
                //A good replacement for this might be findByPK
                //Consider moving this to client resolver
                return sequelize.query(
                    `
                        SELECT *
                            FROM Issue
                            WHERE Issue.id = (
                                SELECT Project.issueId
                                    FROM  project
                                    WHERE Project.id = :project_id
                            )
                    `,
                    {
                        replacements: { projectId: project_id },
                        type: sequelize.QueryTypes.SELECT
                    }
                )
            }
        },
        Mutation: {
            createIssue: async(root, {
                github_url,
                projectId
            }) => {
                return models.Issue.create({
                    github_url,
                    projectId
                })
            }
        }
    }
})
