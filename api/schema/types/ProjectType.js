const { gql } = require('apollo-server')

module.exports = gql`

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        date: String!
        client_id: Int!
        client: Client
        issues: [Issue]
        contributors: [Contributor]
        allocatedPayments: [Payment]
        timeEntries(parameters: TimeEntryInput): [TimeEntry]
    }

    input TimeEntryInput {
        from_date: String
        to_date: String
        contributor_id: Int
    }

    input ProjectInput {
        expected_budget: Int
        is_active: Boolean
        name: String
        github_url: String
        client_id: Int
        date: String
    }

    type Query {
        getProjectById(id: Int!): Project
        getProjects: [Project]
        getContributorsFromProjectByProjectId(id: Int!): [Contributor]
    }

    type Mutation {
        createProject(
            createFields: ProjectInput!,
        ): Project

        deleteProjectById(id: Int!): String

        updateProjectById(
            id: Int!,
            updateFields: ProjectInput
        ): Project
    }

`
