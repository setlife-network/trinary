import { gql } from '@apollo/client'

export const GET_PROJECT = gql`
    query Project($id: Int!){
        getProjectById(id: $id){
            id
            name
            is_active
            expected_budget
            github_url
            toggl_url
            date
            end_date
            totalPaid
            expected_budget_timeframe
            expected_budget_currency
            totalPaid
            contributors {
                id
                name
                avatar_url
            }
            client {
                id
                name
                currency
            }
            allocations {
                id
                active
                contributor {
                    id
                    github_handle
                    name
                }
            }
        }
    }
`