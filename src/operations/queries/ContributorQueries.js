import { gql } from '@apollo/client';

export const CHECK_SESSION = gql`
    query CheckSession{
        checkSession {
            id,
            name
        }
    }
`
