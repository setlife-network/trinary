const { gql } = require('apollo-server')

module.exports = gql`
    type Rate {
        id: Int!
        active: Boolean!
        hourly_rate: String!
        type: String!
        contributor_id: Int!
        total_expected_hours: Int
        currency: String
        contributor: Contributor
    }

    input RateInput {
        active: Boolean
        total_expected_hours: Int
        hourly_rate: String
        type: String
        currency: String
        contributor_id: Int
    }

    type Query {
        getRateById( id: Int!): Rate
        getRates: [Rate]
    }

    type Mutation {
        createRate(
            createFields: RateInput!
        ): Rate
        deleteRateById(id: Int!): String
        updateRateById(
            id: Int!,
            updateFileds: RateInput!
        ): Rate
    }
`
