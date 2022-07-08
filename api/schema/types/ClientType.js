const { gql } = require('apollo-server')

module.exports = gql`

    type Client {
        id: Int!
        is_active: Boolean!
        name: String!
        email: String
        currency: String!
        external_uuid: String!
        payments: [Payment]
        projects: [Project]
        totalPaid(
            fromDate: String
            toDate: String
        ): String
        currencyLocked: Boolean!
    }

    input ClientCreateInput {
        is_active: Boolean,
        name: String!,
        email: String!
        currency: String!
        contributor_id: Int
    }

    input ClientInput {
        is_active: Boolean,
        name: String,
        email: String,
        currency: String
    }

    type Query {
        getClientById(id: Int!): Client
        getClients: [Client]
        getActiveClients: [Client]
        getInactiveClients: [Client]
        getActiveClientsCount: Int!
        getInactiveClientsCount: Int!
    }

    type Mutation {
        createClient(
            createFields: ClientCreateInput!
        ): Client!

        deleteClientById(id: Int!): String

        updateClientById(
            id: Int!,
            updateFields: ClientInput!
        ): Client
    }

`
