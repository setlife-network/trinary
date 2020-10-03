const { gql } = require('apollo-server')

module.exports = gql`

    "Define description"

    type Allocation {
        id: Int!
        amount: Int!
        rateType: Int!
        active: Boolean!
        dateCreated: String!
        datePaid: String
        payment: Payment
        project: Project
        contributor: Contributor
    }

    type Query {
        getAllocationById(id: Int!): Allocation
        getAllocations: [Allocation]
    }

    type Mutation {
        createAllocation(
            amount: Int!,
            rate_type: Int,
            active: Boolean!,
            date_created: String!,
            date_paid: String,
            payment_id: Int!,
            project_id: Int!,
            contributor_id: Int!
        ): Allocation

        deleteAllocationById(id: Int!): String
    }

`
