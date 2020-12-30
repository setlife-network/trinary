import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
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
            client {
                id
                name
            }
        }
    }
`;

export const GET_ACTIVE_PROJECTS_COUNT = gql`
    query Clients($clientId: Int) {
        getActiveProjectsCount(clientId: $clientId)
    }
`;

export const GET_PROJECT = gql`
    query Project($id: Int!, $issuesFromDate: String, $issuesToDate: String){
        getProjectById(id: $id){
            id
            name
            github_url
            client {
                id
                name
            },
            allocatedPayments {
                id
            },
            issues {
                id
            },
            contributors {
                id
            },
            allocations {
                id
            },
            githubIssuesOpened(
                fromDate: $issuesFromDate,
                toDate: $issuesToDate
            )
            githubIssuesClosed(
                fromDate: $issuesFromDate,
                toDate: $issuesToDate
            )
        }
    }
`
