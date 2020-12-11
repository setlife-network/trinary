import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation createProject($client_id: Int!, $name:String!, $github_url: String!, $toggl_url: String, $date: String!, $expected_budget: Int!){
        createProject(createFields: {
            client_id: $client_id
            name: $name,
            github_url: $github_url,
            toggl_url: $toggl_url,
            date: $date,
            is_active: true,
            expected_budget:$expected_budget
        }){
            id,
            name
        }
    }
`
