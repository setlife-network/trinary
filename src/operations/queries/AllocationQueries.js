import { gql } from '@apollo/client'

export const GET_ALLOCATIONS = gql`
    query Allocations($clientId: Int, $projectId: Int) {
        getAllocations(clientId: $clientId, projectId: $projectId) {
            id
            amount
            start_date
            end_date
            date_paid
            rate {
                id
                active
                hourly_rate
                type
                total_expected_hours
            }
        }
    }
`
