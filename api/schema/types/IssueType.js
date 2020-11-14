const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        project_id: Int!
        github_url: String!
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
            updateFields: IssueInput!
        ): Issue
    }
`
