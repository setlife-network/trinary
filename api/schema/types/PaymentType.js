const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        dateIncurred: Date!
        datePaid: Date
        client: Client
    }

    type Query {
        payment(id: Int!): Payment
        payments: [Payment]
        clientPayments(clientId: Int!): [Payment]
    }

    type Mutation {
        createPayment(
            amount: Int!,
            date_incurred: Date,
            date_paid: Date,
            client_id: Int!
        ): Payment
    }

`
