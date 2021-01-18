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
`

export const GET_ACTIVE_PROJECTS_COUNT = gql`
    query Clients($clientId: Int) {
        getActiveProjectsCount(clientId: $clientId)
    }
`

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
                id
                name
                currency
            }
            allocations {
                id
                active
                contributor {
                    id
                    github_handle
                    name
                }
            }
        }
    }
`

export const GET_PROJECT_TIME_ENTRIES = gql`
    query ProjectTimeEntries($id: Int!){
        getProjectById(id: $id){
            id
            timeSpent {
                seconds
            }
            timeEntries {
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

export const GET_PROJECT_PAYMENTS = gql`
    query ProjectTimeEntries($id: Int!){
        getProjectById(id: $id){
            id
            allocatedPayments {
                amount
                date_paid
                date_incurred
                client {
                    id
                    name
                    currency
                }
            }
            client {
                id
                name
                currency
            }
        }
    }
`
export const GET_PROJECT_CONTRIBUTORS = gql`
    query ProjectTimeEntries($id: Int!){
        getProjectById(id: $id){
            id
            contributors {
                id
            }
        }
    }
`

export const GET_PROJECT_ISSUES = gql`
    query ProjectTimeEntries($id: Int!, $issuesFromDate: String, $issuesToDate: String){
        getProjectById(id: $id){
            id
            github_url
            issues {
                id
                github_url
                github_number
                name
                date_opened
                date_closed
            }
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
