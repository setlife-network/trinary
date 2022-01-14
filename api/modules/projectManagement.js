const projectManagement = module.exports = (() => {
    
    const db = require('../models')

    const findIssueByGithubUrl = async (url) => {
        return db.models.Issue.findOne({
            raw: true,
            where: {
                github_url: url
            }
        })
    }

    const findContributorByGithubHandle = async (handle) => {
        return db.models.Contributor.findOne({
            where: {
                github_handle: handle
            }
        })
    }

    const findContributionByGithubUrlAndHandle = async (params) => {
        return db.models.Contribution.findOne({
            include: [
                {
                    model: db.models.Issue,
                    where: {
                        github_url: params.url
                    },
                },
                {
                    model: db.models.Contributor,
                    where: {
                        github_handle: params.handle
                    },
                }
            ]
        });
    }

    return {
        findIssueByGithubUrl,
        findContributorByGithubHandle,
        findContributionByGithubUrlAndHandle
    }
})()