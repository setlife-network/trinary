import { gql } from '@apollo/client'

export const CREATE_ALLOCATION = gql`
    mutation CreateAllocation(
        $amount: Int!,
        $start_date: String!,
        $end_date: String,
        $date_paid: String,
        $payment_id: Int,
        $project_id: Int!,
        $contributor_id: Int!,
        $rate_id: Int!,
        $status: String!
    ) {
        createAllocation(createFields: {
            amount: $amount
            active: true
            start_date: $start_date
            end_date: $end_date
            date_paid: $date_paid
            payment_id:$payment_id
            project_id: $project_id
            contributor_id: $contributor_id
            rate_id: $rate_id,
            status: $status
        }){
            id
            amount
            start_date
            end_date
            date_paid
        }
    }
`

export const DELETE_ALLOCATION = gql`
    mutation DeleteAllocation(
        $id: Int!
    ) {
        deleteAllocationById(id: $id)
    }
`

export const UPDATE_ALLOCATION = gql`
    mutation UpdateAllocation(
        $id: Int!,
        $amount: Int!,
        $start_date: String!,
        $end_date: String!,
        $rate_id: Int!,
        $payment_id: Int
    ) {
        updateAllocationById(
            id: $id
            updateFields: {
                amount: $amount
                start_date: $start_date
                end_date: $end_date
                rate_id: $rate_id
                payment_id: $payment_id
            }
        ){
            id
        }
    }
`
