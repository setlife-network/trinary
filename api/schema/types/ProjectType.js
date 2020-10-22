const { gql } = require('apollo-server')

module.exports = gql`

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        date: String!
        client_id:Int!
        client: Client
        issues: [Issue]
        contributors: [Contributor]
    }

    input ProjectInput {
        expected_budget: Int
        is_active: Boolean
        name: String
        github_url: String
        client_id: Int
    }

    type Query {
        getProjectById(id: Int!): Project
        getProjects: [Project]
    }

    type Mutation {
        createProject(
            createFields: ProjectInput!,
            date: String!
        ): Project

        deleteProjectById(id: Int!): String

        updateProjectById(
            id: Int!,
            date: String,
            updateFields: ProjectInput,
        ): [Int]
    }

`
