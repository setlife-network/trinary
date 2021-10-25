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
                currency
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
            end_date
            totalPaid
            expected_budget_timeframe
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
export const GET_PROJECT_CLIENT_PAYMENTS = gql`
    query ProjectClientPayments($id: Int!){
        getProjectById(id: $id) {
            id
            client {
                id
                currency
                payments {
                    id
                    amount
                    date_paid
                    date_incurred
                    totalAllocated
                }
            }
        }
    }
`
export const GET_PROJECT_CONTRIBUTOR_ALLOCATIONS = gql`
    query ProjectContributorAllocations($id: Int!, $contributorId: Int){
        getProjectById(id: $id){
            id
            name
            allocations(
                contributorId: $contributorId
            ){
                id
                amount
                start_date
                end_date
                contributor {
                    id
                    name
                }
                payment {
                    id
                }
                rate {
                    id
                    total_expected_hours
                    hourly_rate
                    type
                }
            }
        }
    }
`
export const GET_PROJECT_CONTRIBUTORS = gql`
    query ProjectContributors($id: Int!){
        getProjectById(id: $id){
            id
            name
            github_url
            contributors {
                id
                name
                github_id
                github_handle
                github_access_token
            }
            allocations {
                id
                active
                amount
                date_paid
                start_date
                end_date
                contributor {
                    id
                    name
                    github_id
                    github_handle
                }
            }
        }
    }
`
export const GET_PROJECT_ISSUES = gql`
    query ProjectTimeEntries($id: Int!, $issuesFromDate: String, $issuesToDate: String){
        getProjectById(id: $id){
            id
            name
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
            githubPullRequestsOpened
            githubPullRequestsClosed
            githubPullRequestsMerged
        }
    }
`
export const GET_PROJECT_PAYMENTS = gql`
    query ProjectTimePayments($id: Int!){
        getProjectById(id: $id){
            id
            name
            github_url
            allocatedPayments {
                id
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
export const GET_PROJECT_PAYMENTS_SUMMARY = gql`
    query ProjectPaymentsSummary($id: Int!){
        getProjectById(id: $id){
            id
            totalAllocated
            totalAllocatedConfirmed: totalAllocated(confirmedOnly: true)
            totalPaid
            totalIncurredPayments
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
export const GET_PROJECT_TOTAL_PROPOSED = gql`
    query ProjectTotalProposed($id: Int!){
        getProjectById(id: $id){
            id
            totalAllocated
            totalAllocatedConfirmed: totalAllocated(confirmedOnly: true)
        }
    }
`
