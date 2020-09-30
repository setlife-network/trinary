const { gql } = require('apollo-server')

module.exports = gql`

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        date: String!
        client: Client
        issues: [Issue]
    }

    type Query {
        project(id: Int!): Project
        projects: [Project]
    }

    type Mutation {
        createProject(
            expected_budget: Int!
            is_active: Boolean!
            name: String!
            github_url: String!
            date: String!
            client_id: Int!
        ): Project
    }

`
