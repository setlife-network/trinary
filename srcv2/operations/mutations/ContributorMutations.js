import { gql } from '@apollo/client'

export const CREATE_RATE = gql`
    mutation createRate(
        $total_expected_hours: Int, 
        $hourly_rate: String!, 
        $minimum_expected_hours: Int, 
        $maximum_expected_hours: Int, 
        $minimum_hourly_rate: String,
        $maximum_hourly_rate: String,
        $type: String!,
        $currency: String, 
        $contributor_id: Int!){
        createRate(createFields: {
            active: true
            total_expected_hours: $total_expected_hours
            hourly_rate: $hourly_rate
            minimum_expected_hours: $minimum_expected_hours
            maximum_expected_hours: $maximum_expected_hours
            minimum_hourly_rate: $minimum_hourly_rate
            maximum_hourly_rate: $maximum_hourly_rate
            type: $type
            currency: $currency
            contributor_id: $contributor_id
        }){
            id
        }
    }
` 

export const CREATE_ALLOCATION = gql`
    mutation CreateAllocation(
        $amount: Int!,
        $active: Boolean!,
        $start_date: String!,
        $contributor_id: Int!,
        $project_id: Int!,
        $rate_id: Int!,
        $status: String!
    ) {
        createAllocation(createFields: {
            amount: $amount
            active: $active,
            start_date: $start_date,
            contributor_id: $contributor_id,
            project_id: $project_id,
            rate_id: $rate_id,
            status: $status
        }) {
            id
        }
    }
` 