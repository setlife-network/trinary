const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        github_url: String!
        project: Project!
    }

    type Query {
        issue(id: Int!): Issue
        projectIssues(projectId: Int!): [Issue]
    }

    type Mutation {
        createIssue(
            github_url: String!,
            project_id: Int!
        ): Issue
    }
`
