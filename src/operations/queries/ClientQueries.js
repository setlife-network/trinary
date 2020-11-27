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
