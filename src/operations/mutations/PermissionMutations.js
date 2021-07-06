import { gql } from '@apollo/client';

export const CREATE_PERMISSION = gql`
    mutation CreatePermission($contributor_id: Int!, $project_id: Int!, $type: String!) {
        createPermission(createFields: {
            contributor_id: $contributor_id
            project_id: $project_id
            type: $type
        }) {
            id
        }
    }
`
