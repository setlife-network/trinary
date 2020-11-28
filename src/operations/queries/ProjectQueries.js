import { gql } from '@apollo/client';

export const GET_POJECTS = gql`
    query Projects {
        getProjects {
            id
            name
            is_active
            expected_budget
            github_url
            toggl_url
            client_id
            toggl_id
            date
        }
    }
`;
