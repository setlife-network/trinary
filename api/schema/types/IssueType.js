const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        github_url: String!
        project: Project!
    }

    type Query {
        getIssueById(id: Int!): Issue
        getProjectIssuesByProjectId(projectId: Int!): [Issue]
    }

    type Mutation {
        createIssue(
            github_url: String!,
            project_id: Int!
        ): Issue

        deleteIssueById(id: Int!): String
    }
`
