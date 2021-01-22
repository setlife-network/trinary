import { gql } from '@apollo/client'

export const CHECK_SESSION = gql`
    query CheckSession{
        checkSession {
            id
            name
            github_id
            github_handle
            github_access_token
            toggl_id
            external_data_url
        }
    }
`

export const GET_CONTRIBUTORS = gql`
    query Contributors {
        getContributors {
            id
            name
            github_id
            github_handle
            toggl_id
            external_data_url
            github_access_token
        }
    }
`

export const GET_CONTRIBUTOR_ALLOCATIONS = gql`
    query ContributorAllocation($id: Int!) {
        getContributorById(id: $id) {
            id
            allocations {
                id
                amount
                active
                start_date
                end_date
                date_paid
                rate {
                    id
                    active
                    type
                    hourly_rate
                    monthly_hours
                }
            }
        }
    }
`

export const GET_CONTRIBUTOR_RATES = gql`
    query ContributorAllocation($id: Int!) {
        getContributorById(id: $id) {
            id
            github_access_token
            rates {
                id
                active
                type
                hourly_rate
                monthly_hours
            }

        }
    }
`
