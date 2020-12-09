import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
    query Clients {
        getClients {
            id
            name
            currency
            is_active
        }
    }
`;

export const GET_ACTIVE_CLIENTS_COUNT = gql`
    query Clients {
        getActiveClientsCount
    }
`;

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
