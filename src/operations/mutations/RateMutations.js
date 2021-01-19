import { gql } from '@apollo/client'

export const CREATE_RATE = gql`
    mutation createRate($monthly_hours: Int!, $hourly_rate: String!, $type: String!, $contributor_id: Int!){
        createRate(createFields: {
            active: true
            monthly_hours: $monthly_hours
            hourly_rate: $hourly_rate
            type: $type
            contributor_id: $contributor_id
        }){
            id
        }
    }
`
