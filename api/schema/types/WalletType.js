const { gql } = require('apollo-server')

module.exports = gql`

    type Wallet {
        id: Int!
        contributor_id: Int
        project_id: Int
        onchain_address: String
        invoice_macaroon: String
        lnd_host: String
        lnd_port: Int
        btcps_api_key: String
        balance: Int
        balance_last_updated: String
        alby_oauth_token: String
        voltage_node_id: String
        voltage_api_key: String
    }

    type Mutation {
        updateContributorNode(
            contributor_id: Int
            host: String
            port: Int
            macaroon: String
        ): Wallet
        updateContributorOnChainAddress(
            contributor_id: Int
            address: String
        ): Wallet
    }

`