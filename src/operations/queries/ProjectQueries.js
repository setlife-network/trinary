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
    query Project($id: Int!){
        getProjectById(id: $id){
            id
            name
            is_active
            expected_budget
            github_url
            toggl_url
            date
            totalPaid
            client {
                id,
                name
            }
            allocatedPayments {
                id
            }
            issues {
                id
            }
            contributors {
                id
            }
            allocations {
                id
            }
            timeSpent {
                seconds
            }
            timeEntries{
                id
                seconds
                contributor {
                    name
                }
            }
            timeSpentPerContributor {
                seconds
                contributor {
                    name
                }
            }
        }
    }
`

export const GET_PROJECT_TIME_ENTRIES = gql`
    query ProjectTimeEntrie($id: Int!, $fromDate: String, $toDate: String){
        getProjectById(id: $id){
            id
            timeEntries(fromDate: $fromDate, toDate: $toDate) {
                id
                seconds
                contributor {
                    name
                }
            }
            timeSpent(fromDate: $fromDate, toDate: $toDate) {
                seconds
            }
            timeSpentPerContributor(fromDate: $fromDate, toDate: $toDate) {
                seconds
                contributor {
                    name
                }
            }
        }
    }
`
