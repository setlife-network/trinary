const { gql } = require('apollo-server')

module.exports = gql`

    type Contributor {
        id: Int!
        hourly_rate: Int
        weekly_rate: Int
        monthly_rate: Int
        name: String!
        date_created: String!
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
            date_created: String!
        ): Contributor
    }
`
