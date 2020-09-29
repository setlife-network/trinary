const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    "Define description"

    type Allocation {
        id: Int!
        amount: Int!
        rateType: Int!
        active: Boolean!
        dateCreated: Date!
        datePaid: Date!
        payment: Payment
        project: Project
        contributor: Contributor
    }

    type Query {
        allocation(id: Int!): Allocation
        allocations: [Allocation]
    }

    type Mutation {
        createAllocation(
            amount: Int!,
            rate_type: Int,
            active: Boolean!,
            date_created: Date!,
            date_paid: Date!,
            payment_id: Int!,
            project_id: Int!,
            contributor_id: Int!
        ): Allocation
    }

`
