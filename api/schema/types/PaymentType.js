const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        date_incurred: String!
        date_paid: String
        client_id: Int!
        client: Client
    }

    input PaymentInput {
        amount: Int!,
        client_id: Int!
    }

    type Query {
        getPaymentById(id: Int!): Payment
        getPayments: [Payment]
        getClientPaymentsByClientId(clientId: Int!): [Payment]
    }

    type Mutation {
        createPayment(
            createFields: PaymentInput,
            date_incurred: String,
            date_paid: String,
        ): Payment

        deletePaymentById(id: Int!): String

        updatePaymentById(
            id:Int!,
            amount: Int!,
            date_incurred: String,
            date_paid: String,
            client_id: Int!
        ): [Int]
    }

`
