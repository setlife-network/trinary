import { gql } from '@apollo/client'

export const GET_ALLOCATIONS = gql`
    query Allocations($contributorId: Int, $projectId: Int) {
        getAllocations(contributorId: $contributorId, projectId: $projectId) {
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
            payment {
                id
                client {
                    id
                    name
                    currency
                }
            }
        }
    }
`
