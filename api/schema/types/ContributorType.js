const gql = require('apollo-server')

module.exports = gql`
    scalar Date

    type Contributor {
        id: Int!
        hourly_rate: Int
        weekly_rate: Int
        monthly_rate: Int
        name: String!
        date_created: Date!
    }

    type Query {
        getContributors: [Contributor],
        getContributor(id: Int!): Contributor
    }

    type Mutation {
        createContributor(
            hourly_rate: Int,
            weekly_rate: Int,
            monthly_rate: Int,
            name: String!,
            date_created: Date!
        ): Contributor
    }
`
