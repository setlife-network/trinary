const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        currency: String!
        date_created: Date!
        payments: [Payment]
        projects: [Project]
    }

    type Query {
        client(id: Int!): Client
        clients: [Client]
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
