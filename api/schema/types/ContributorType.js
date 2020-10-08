const { gql } = require('apollo-server')

module.exports = gql`

    type Contributor {
        id: Int!
        hourly_rate: Int
        weekly_rate: Int
        monthlyRate: Int
        name: String!
        external_data_url: String
        github_id: String!
        github_handle: String!
    }

    input ContributorInput {
        hourly_rate: Int,
        weekly_rate: Int,
        monthly_rate: Int,
        name: String!,
        external_data_url: String,
        github_id: String!,
        github_handle: String!
    }

    type Query {
        getContributorById(id: Int!): Contributor
        getContributors: [Contributor]
    }

    type Mutation {
        createContributor(
            createFields: ContributorInput
        ): Contributor
    }
`
