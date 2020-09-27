const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        date: Date!
        client: Client
    }

    type Query {
        getProject(id: Int!): Project
        getProjectClient(id: Int!): Client
    }

    type Mutation {
        createProject(
            expected_budget: Int!
            is_active: Boolean!
            name: String!
            github_url: String!
            date: Date!
            clientId: Int!
        )
    }

`
