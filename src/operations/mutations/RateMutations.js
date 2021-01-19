import { gql } from '@apollo/client'

export const CREATE_RATE = gql`
    mutation createRate($hourly_rate: String!, $type: String!, $contributor_id: Int!){
        createRate(createFields: {
            active: true
            hourly_rate: $hourly_rate
            type: $type
            contributor_id: $contributor_id
        }){
            id
        }
    }
`
