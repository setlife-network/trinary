const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        github_url: String!
        project: Project!
    }

    type Query {
        getIssue(id: Int!): Issue,
        getProjectIssues(projectId: Int!): [Issue]
    }

    type Mutation {
        createIssue(
            github_url: String!
            projectId: Int!
        ): Issue
    }
`
