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