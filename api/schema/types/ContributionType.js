const { gql } = require('apollo-server')

module.exports = gql`

    type Contribution {
        id: Int!
        contributor_id: Int!
        issue_id: Int!
        is_author: Int!
        is_assigned: Int!
        contributor: Contributor!
        issue: Issue!
    }
    type Query {
        getContributions: [Contribution]
        getContributionsByContributorId(contributorId: Int!): [Contribution]
        getContributionsByIssueId(issueId: Int!): [Contribution]
        getContributionByContributorIdAndIssueId(
            contributor_id: Int!
            issue_id: Int!
        ): Contribution
    }
    input CreateContributionInput {
        contributor_id: Int!
        issue_id: Int!
        is_author: Int!,
        is_assigned: Int!
    }
    type Mutation {
        createContribution(createFields: CreateContributionInput): Contribution
    }
    `