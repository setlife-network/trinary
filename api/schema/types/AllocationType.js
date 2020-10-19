const { gql } = require('apollo-server')
//TODO: Change this when rates table added
module.exports = gql`

    type Allocation {
        id: Int!
        amount: Int!
        rate_unit: Int
        rate_type: String!
        active: Boolean!
        start_date: String!
        created_at: String!
        end_date: String!
        date_paid: String
        payment: Payment
        project: Project
        contributor: Contributor
    }

    input CreateAllocationInput {
        amount: Int!
        rate_unit: Int
        rate_type: String!
        active: Boolean!
        start_date: String!
        created_at: String!
        end_date: String!
        date_paid: String
        payment_id: Int,
        project_id: Int!,
        contributor_id: Int!
    }

    input UpdateAllocationInput {
        amount: Int
        rate_unit: Int
        rate_type: String
        active: Boolean
        start_date: String
        created_at: String
        end_date: String
        date_paid: String
        payment_id: Int,
        project_id: Int,
        contributor_id: Int
    }

    type Query {
        getAllocationById(id: Int!): Allocation
        getAllocations: [Allocation]
    }

    type Mutation {
        createAllocation(
            createFields: CreateAllocationInput,
        ): Allocation

        deleteAllocationById(id: Int!): String

        updateAllocationById(
            id:Int!,
            updateFields: UpdateAllocationInput,
        ): Allocation
    }

`
