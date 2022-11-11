import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation createProject(
        $name: String!,
        $github_url: String!
    ){
        createProject(createFields: {
            name: $name,
            github_url: $github_url,
        }){
            id,
            name
        }
    }
`