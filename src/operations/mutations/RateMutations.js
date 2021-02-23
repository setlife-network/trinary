import { gql } from '@apollo/client'

export const CREATE_RATE = gql`
    mutation createRate($total_expected_hours: Int, $hourly_rate: String!, $type: String!,$currency: String, $contributor_id: Int!){
        createRate(createFields: {
            active: true
            total_expected_hours: $total_expected_hours
            hourly_rate: $hourly_rate
            type: $type
            currency: $currency
            contributor_id: $contributor_id
        }){
            id
        }
    }
`
