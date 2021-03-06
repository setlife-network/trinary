const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        date_incurred: String!
        date_paid: String
        client_id: Int!
        totalAllocated: Int
        external_uuid: String
        external_uuid_type: String
        client: Client
        allocations: [Allocation]
    }

    input PaymentInput {
        amount: Int,
        client_id: Int,
        date_incurred: String,
        date_paid: String
    }

    type Query {
        getPaymentById(id: Int!): Payment
        getPayments: [Payment]
        getClientPaymentsByClientId(clientId: Int!): [Payment]
    }

    type Mutation {
        createPayment(
            createFields: PaymentInput!
        ): Payment

        syncPayments(
            source: String!
        ): String

        deletePaymentById(id: Int!): String

        updatePaymentById(
            id:Int!,
            updateFields: PaymentInput!,
        ): Payment
    }

`
