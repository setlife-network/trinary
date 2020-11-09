const { gql } = require('apollo-server')

module.exports = gql`

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        email: String!
        currency: String!
        payments: [Payment]
        projects: [Project]
        totalPaid(
            fromDate: String
            toDate: String
        ): String
    }

    input ClientInput {
        is_active: Boolean,
        name: String,
        email: String,
        currency: String,
    }

    type Query {
        getClientById(id: Int!): Client
        getClients: [Client]
    }

    type Mutation {
        createClient(
            createFields: ClientInput!
        ): Client!

        deleteClientById(id: Int!): String

        updateClientById(
            id: Int!,
            updateFields: ClientInput
        ): Client
    }

`
