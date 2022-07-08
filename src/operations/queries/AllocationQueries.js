import { gql } from '@apollo/client'

export const GET_ALLOCATIONS = gql`
    query Allocations($contributorId: Int, $projectId: Int) {
        getAllocations(contributorId: $contributorId, projectId: $projectId) {
            id
            amount
            start_date
            end_date
            date_paid
            contributor {
                id
                name
            }
            rate {
                id
                active
                hourly_rate
                type
                currency
                total_expected_hours
                minimum_hourly_rate,
                minimum_expected_hours,
                maximum_hourly_rate,
                maximum_expected_hours
            }
            payment {
                id
                amount
                client {
                    id
                    name
                    currency
                }
            }
            project {
                id
                name
                client {
                    id
                    name
                    currency
                }
            }
        }
    }
`

export const GET_ALLOCATION_INFO = gql`
    query Allocation($id: Int!) {
        getAllocationById(id: $id) {
            id
            amount
            start_date
            end_date
            payment {
                id
                amount
                date_incurred
                date_paid
            }
            contributor {
                id
                name
            }
            project {
                id
                name
                client {
                    id
                    name
                    currency
                }
            }
            rate {
                id
                hourly_rate
                total_expected_hours
                type
                currency
                minimum_hourly_rate,
                minimum_expected_hours,
                maximum_hourly_rate,
                maximum_expected_hours
            }
        }
    }
`
