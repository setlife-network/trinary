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