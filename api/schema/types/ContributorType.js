const { gql } = require('apollo-server')

module.exports = gql`

    type Contributor {
        id: Int!
        toggl_id: Int
        name: String!
        external_data_url: String
        github_id: String
        github_handle: String
        github_access_token: String
        allocations: [Allocation]
        permissions: [Permission]
        timeEntries: [TimeEntry]
        rates: [Rate]
    }

    input CreateContributorInput {
        hourly_rate: Int
        weekly_rate: Int
        monthly_rate: Int
        name: String!
        external_data_url: String
        github_id: String
        github_handle: String
    }

    input UpdateContributorInput {
        hourly_rate: Int
        weekly_rate: Int
        monthly_rate: Int
        toggl_id: Int
        name: String
        external_data_url: String
        github_id: String
        github_handle: String
    }

    type Query {
        checkSession: Contributor
        getContributorById(id: Int!): Contributor
        getContributors: [Contributor]
    }

    type Mutation {
        linkTogglContributor(contributorId: Int!, togglAPIKey: String!): Contributor
        createContributor(
            createFields: CreateContributorInput!
        ): Contributor
        deleteContributorById(id: Int!): String
        updateContributorById(
            id: Int!
            updateFields: UpdateContributorInput!
        ):Contributor
    }
`
