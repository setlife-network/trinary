const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        dateIncurred: String!
        datePaid: String
        client: Client
    }

    type Query {
        getPaymentById(id: Int!): Payment
        getPayments: [Payment]
        getClientPaymentsByClientId(clientId: Int!): [Payment]
    }

    type Mutation {
        createPayment(
            amount: Int!,
            date_incurred: String,
            date_paid: String,
            client_id: Int!
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
