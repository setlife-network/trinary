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
