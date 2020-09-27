const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    "Define description"

    type Allocation {
        id: Int!
        amount: Int!
        rate_type: Int!
        active: Boolean!
        date_created: Date!
        date_paid: Date!
        payment: Payment
        proyect: Proyect
        contributor: Contributor
    }

    type Query {
        getAllocations: [Allocation]
        getAllocation(id: Int!): Allocation
    }

    type Mutation {
        createAllocation(
            amount: Int!,
            rate_type: Int,
            active: Boolean!,
            date_created: Date!,
            date_paid: Date!,
            paymentId: Int!,
            proyectId: Int!,
            contributorId: Int!
        ): Allocation
    }

`
