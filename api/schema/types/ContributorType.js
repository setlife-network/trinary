const { gql } = require('apollo-server')

module.exports = gql`

    type Contributor {
        id: Int!
        hourlyRate: Int
        weeklyRate: Int
        monthlyRate: Int
        name: String!
        externalDataUrl: String
        githubId: String!,
        githubHandle: String!

    }

    type Query {
        getContributorById(id: Int!): Contributor
        getContributors: [Contributor]
    }

    type Mutation {
        createContributor(
            hourly_rate: Int,
            weekly_rate: Int,
            monthly_rate: Int,
            name: String!,
            external_data_url: String,
            github_id: String!,
            github_handle: String!
        ): Contributor
    }
`
