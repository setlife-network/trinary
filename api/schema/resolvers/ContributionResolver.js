module.exports = {
    Contribution: {
        contributor: (permission, args, { models }) => {
            return models.Contributor.findByPk(permission.contributor_id)
        },
        issue: (permission, args, { models }) => {
            return models.Issue.findByPk(permission.issue_id)
        }
    },
    Query: {
        getContributions: (root, args, { models }) => {
            return models.Contribution.findAll()
        },
        getContributionsByContributorId: (root, { id }, { models }) => {
            return models.Contribution.findAll({
                where: {
                    contributor_id: id
                }
            })
        },
        getContributionsByIssueId: (root, { id }, { models }) => {
            return models.Contribution.findAll({
                where: {
                    issue_id: id
                }
            })
        },
        getContributionByContributorIdAndIssueId: (root, { contributor_id, issue_id }, { models }) => {
            return models.Contribution.findOne({
                where: {
                    contributor_id,
                    issue_id
                }
            })
        },
    },
    Mutation: {
        createContribution: (root, { createFields }, { models }) => {
            return models.Contribution.create({
                ...createFields
            })
        },
        deleteContributionById: (root, { id }, { models }) => {
            return models.Contribution.destroy({ where: { id } })
        },
        updateContributionById: async (root, { id, updateFields }, { models }) => {
            await models.Contribution.update({
                ...updateFields
            }, {
                where: {
                    id
                }
            })
            return models.Contribution.findByPk(id)
        }
    }
}