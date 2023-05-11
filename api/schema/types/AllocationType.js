const { gql } = require('apollo-server')
//TODO: Change this when rates table added
module.exports = gql`

    type Allocation {
        id: Int!
        amount: Int!
        rate_id: Int!
        active: Boolean!
        start_date: String!
        created_at: String!
        end_date: String
        date_paid: String
        status: String
        payment: Payment
        project: Project
        contributor: Contributor
        rate: Rate
        proposedBy: Contributor
    }

    input CreateAllocationInput {
        amount: Int!
        active: Boolean!
        start_date: String!
        end_date: String
        date_paid: String
        payment_id: Int
        project_id: Int!
        contributor_id: Int!
        rate_id: Int!
        status: String
    }

    input UpdateAllocationInput {
        amount: Int
        active: Boolean
        start_date: String
        end_date: String
        date_paid: String
        payment_id: Int
        project_id: Int
        contributor_id: Int
        rate_id: Int
        status: String
    }

    type Query {
        getAllocationById(id: Int!): Allocation
        getAllocations(contributorId: Int, projectId: Int): [Allocation]
    }

    type Mutation {
        createAllocation(
            createFields: CreateAllocationInput!,
        ): Allocation

        deleteAllocationById(id: Int!): String

        updateAllocationById(
            id:Int!,
            updateFields: UpdateAllocationInput!
        ): Allocation
    }

`
