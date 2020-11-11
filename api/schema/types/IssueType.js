const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        github_url: String!
        date_opened: String
        date_closed: String
        project_id: Int!
        project: Project!
    }

    input IssueInput {
        github_url: String,
        project_id: Int
    }

    type Query {
        getIssueById(id: Int!): Issue
        getIssuesByProjectId(project_id: Int!): [Issue]
    }

    type Mutation {
        createIssue(
            createFields: IssueInput!
        ): Issue

        deleteIssueById(id: Int!): Int

        updateIssueById(
            id: Int!,
            updateFields: IssueInput
        ): Issue
    }
`
