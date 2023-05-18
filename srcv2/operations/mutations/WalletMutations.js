import { gql } from '@apollo/client';

export const UPDATE_NODE = gql`
    mutation updateContributorNode(
        $host: String,
        $port: Int,
        $macaroon: String
    ){
        updateContributorNode(
            host: $host
            port: $port
            macaroon: $macaroon
        ){
            id
        }
    }
`