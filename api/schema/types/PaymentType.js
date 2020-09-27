const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        date_incurred: Date!
        date_paid: Date
        client: Client
    }

    type Query {
        getPayment(id: Int!): Payment
        getClientPayments(clientid: int!): [Payemnt]
    }

    type Mutation {
        createPayment(
            amount: Int!,
            date_incurred: Date!,
            date_paid: Date,
            clientId: Int!
        ): Payment
    }

`
