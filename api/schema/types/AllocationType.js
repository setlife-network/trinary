const { gql } = require('apollo-server')

module.exports = gql`

    type Allocation {
        id: Int!
        amount: Int!
        rate_type: Int!
        active: Boolean!
        created_at: String!
        date_paid: String
        start_date: String!
        end_date: String!
        payment: Payment
        project: Project
        contributor: Contributor
    }

    input AllocationInput {
        amount: Int,
        rate_type: Int,
        active: Boolean,
        payment_id: Int,
        project_id: Int,
        contributor_id: Int,
        date_paid: String,
        start_date: String!,
        end_date: String!
    }

    type Query {
        getAllocationById(id: Int!): Allocation
        getAllocations: [Allocation]
    }

    type Mutation {
        createAllocation(
            createFields: AllocationInput!,
        ): Allocation

        deleteAllocationById(id: Int!): String

        updateAllocationById(
            id:Int!,
            updateFields: AllocationInput,
        ): [Int]
    }

`
