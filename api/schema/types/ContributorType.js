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
        "The following attributes are calculated and aren't on the database"
        totalPaid: Int!
        paidByCurrency: [TotalAllocatedByCurrency]
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

    type ContributorOrganizations {
        id: Int!
        avatar: String
        name: String
    }
    
    type ContributorRepos {
        id: Int!
        avatar: String
        name: String
        repos: [GithubRepo]
    }

    type GithubRepo {
        id: Int
        name: String
        githubUrl: String
    }

    type TotalAllocatedByCurrency {
        amount: Int
        currency: String
    }

    type Query {
        checkSession: Contributor
        getContributorById(id: Int!): Contributor
        getContributors: [Contributor]
        getGithubOrganizations(contributorId: Int): [ContributorOrganizations]
        getGithubRepos(
            organizationName: String!
            githubPageNumber: Int!
        ):  [GithubRepo]
    }

    type Mutation {
        createContributor(
            createFields: CreateContributorInput!
        ): Contributor
        deleteContributorById(id: Int!): String
        linkTogglContributor(
            contributorId: Int!,
            togglAPIKey: String!
        ): Contributor
        updateContributorById(
            id: Int!
            updateFields: UpdateContributorInput!
        ):Contributor
    }
`
