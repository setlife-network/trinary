const { gql } = require('apollo-server')

module.exports = gql`

    type Client {
        id: Int!
        isActive: Boolean!
        name: String!
        currency: String!
        payments: [Payment]
        projects: [Project]
        createdAt: String!
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
        ): Client!
    }

`
