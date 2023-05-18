import { gql } from '@apollo/client';

export const UPDATE_WALLET_ADDRESS = gql`
    mutation updateContributorOnChainAddress(
        $address: String!
    ) {
        updateContributorOnChainAddress(address: $address) {
            id
        }
    }
`

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