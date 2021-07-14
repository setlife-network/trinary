import { gql } from '@apollo/client'

export const GET_ACTIVE_CLIENTS_COUNT = gql`
    query Clients {
        getActiveClientsCount
    }
`

export const GET_INACTIVE_CLIENTS_COUNT = gql`
    query Clients {
        getInactiveClientsCount
    }
`

export const GET_CLIENT_INFO = gql`
    query Client($id: Int!) {
        getClientById(id: $id){
            id
            name
            email
            currency
            is_active
            projects {
                id
                name
                is_active
            }
        }
    }
`

export const GET_CLIENT_PROJECTS = gql`
    query ClientProjects($id: Int!) {
        getClientById(id: $id){
            id,
            projects {
                id
                name
                is_active
                github_url
                contributors {
                    id
                    name
                    github_handle
                }
            }
        }
    }
`

export const GET_CLIENT_TOTAL_PAID = gql`
    query ClientTotalPaid($id: Int!, $fromDate: String, $toDate: String) {
        getClientById(id: $id){
            id,
            currency
            totalPaid (
                fromDate: $fromDate,
                toDate: $toDate
            )
        }
    }
`

export const GET_CLIENTS = gql`
    query Clients {
        getClients {
            id
            name
            currency
            is_active
        }
    }
`

export const GET_CLIENT_PAYMENTS = gql`
query ClientPayments($clientId: Int!) {
    getClientById(id: $clientId){
        id,
        payments {
            id
            amount
            date_incurred
            date_paid
        }
    }
}
`
