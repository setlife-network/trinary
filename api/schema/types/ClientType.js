const { gql } = require('apollo-server')

module.exports = gql`

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        currency: String!
        date_created: String!
        payments: [Payment]
        projects: [Project]
    }

    type Query {
        getClientById(id: Int!): Client
        getClients: [Client]
    }

    type Mutation {
        createClient(
            is_active: Boolean!,
            name: String!,
            currency: String!,
            date_created: String!
        ): Client!

        deleteClientById(id: Int!): String

        updateClientById(
            id: Int!,
            is_active: Boolean!,
            name: String!,
            currency: String!,
            date_created: String!
        ): [Int]
    }

`
