const { gql } = require('apollo-server')

module.exports = gql`

    type Issue {
        id: Int!
        project_id: Int!
        github_url: String!
        project: Project!
    }

    input IssueInput {
        github_url: String!,
        project_id: Int!
    }

    type Query {
        getIssueById(id: Int!): Issue
        getProjectIssuesByProjectId(projectId: Int!): [Issue]
    }

    type Mutation {
        createIssue(
            createFields: IssueInput
        ): Issue
    }
`
