const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        currency: String!
        date_created: Date!

    }

    type Query {
        getClients: [Client]
        getClient(id: Int!): Client
    }

    type Mutation {
        createClient(
            is_active: Boolean!,
            name: String!,
            currency: String!,
            date_created: Date!
        ): Client!
    }

`
