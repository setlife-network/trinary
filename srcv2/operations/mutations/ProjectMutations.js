import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation createProject(
        $name: String!,
        $github_url: String!,
        $is_public: Boolean!
    ){
        createProject(createFields: {
            name: $name,
            github_url: $github_url,
            is_public: $is_public,
            is_active: true
        }){
            id,
            name
        }
    }
`

export const UPDATE_PROJECT = gql`
    mutation updateProjectById(
        $project_id: Int!,
        $date: String,
        $end_date: String,
        $expected_budget: Int,
        $expected_budget_currency: String,
        $name: String,
        $github_url: String,
        $expected_budget_timeframe: String,
        $toggl_url: String
        $is_active: Boolean
    ){
        updateProjectById(
            id: $project_id,
            updateFields: {
                name: $name
                github_url: $github_url
                expected_budget_timeframe: $expected_budget_timeframe
                expected_budget_currency: $expected_budget_currency
                toggl_url: $toggl_url
                date: $date
                end_date: $end_date
                expected_budget: $expected_budget
                is_active: $is_active
            }
        ){
            id,
            name,
            end_date,
            expected_budget,
            expected_budget_timeframe,
            is_active,
            github_url,
            toggl_url
            is_active
        }
    }
`