const { gql } = require('apollo-server')

module.exports = gql`

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        currency: String!
        payments: [Payment]
        projects: [Project]
    }

    input ClientInput {
        is_active: Boolean!,
        name: String!,
        currency: String!,
    }

    type Query {
        getClientById(id: Int!): Client
        getClients: [Client]
    }

    type Mutation {
        createClient(
            createFields: ClientInput
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
