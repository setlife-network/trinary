import { gql } from '@apollo/client';

export const UPDATE_ALLOCATION = gql`
    mutation UpdateAllocation(
        $id: Int!,
        $status: String,
        $amount: Int,
        $start_date: String,
        $end_date: String,
        $rate_id: Int,
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
                status: $status
            }
        ){
            id
        }
    }
`