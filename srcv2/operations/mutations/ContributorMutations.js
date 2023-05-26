import { gql } from '@apollo/client'

export const CREATE_ALLOCATION = gql`
    mutation CreateAllocation(
        $amount: Int!,
        $active: Int!,
        $start_date: Int!,
        $contributor_id: Int!,
        $project_id: Int!,
        $rate_id: Int!
    ) {
        createAllocation(createFields: {
            amount: $amount
            active: $active,
            start_date: $start_date,
            contributor_id: $contributor_id,
            project_id: $project_id,
            rate_id: $rate_id 
        }) {
            id
        }
    }
` 