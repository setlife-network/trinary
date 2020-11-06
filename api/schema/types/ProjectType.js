const { gql } = require('apollo-server')

module.exports = gql`

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        toggl_url: String
        date: String!
        client_id: Int!
        allocations: [Allocation]
        allocatedPayments: [Payment]
        averageHourlyPaid(fromDate: String, toDate: String): Int
        averageIssueCost(fromDate: String, toDate: String): AverageIssueCost
        client: Client
        contributors: [Contributor]
        githubContributors: [Contributor]
        issues: [Issue]
        timeEntries(
            fromDate: String
            toDate: String
            contributor_id: Int
        ): [TimeEntry]
        timeSpent(
            fromDate: String!
            toDate: String!
            contributor_id: Int
        ): TimeSpent
        totalPaid(fromDate: String, toDate: String): Int
    }

    type AverageIssueCost {
        fromPayments: Int
        fromAllocations: Int
    }

    type TimeSpent {
        seconds: Int
    }

    input ProjectInput {
        expected_budget: Int
        is_active: Boolean
        name: String
        github_url: String
        toggl_url: String
        client_id: Int
        date: String
    }

    type Query {
        getProjectById(id: Int!): Project
        getProjects: [Project]
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
