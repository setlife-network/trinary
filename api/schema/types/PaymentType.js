const { gql } = require('apollo-server')

module.exports = gql`

    type Payment {
        id: Int!
        amount: Int!
        date_incurred: String!
        date_paid: String
        client_id: Int
        project_id: Int
        contributor_id: Int
        currency: String
        totalAllocated: Int
        external_uuid: String
        external_uuid_type: String
        client: Client
        allocations: [Allocation]
        isBitcoinInvoiceExpired: Boolean
        bitcoinCheckoutUrl: String
        contributor: Contributor
    }
    
    type BTCPayment {
        transactionHash: String
        paymentRequest: String
        amount: String
        status: String
        error: String
    }

    input PaymentInput {
        amount: Int,
        currency: String,
        client_id: Int,
        project_id: Int,
        contributor_id: Int,
        date_incurred: String,
        date_paid: String
    }

    input ContributorInput {
        id: Int,
        amount: Int
    }

    type Query {
        getPaymentById(id: Int!): Payment
        getPayments: [Payment]
        getClientPaymentsByClientId(clientId: Int!): [Payment]
        importInvoicelyCsvToStripe: String
    }

    type Mutation {
        createPayment(
            createFields: PaymentInput!
        ): Payment

        generateBitcoinInvoiceFromPayment(
            paymentId: Int!
        ): Payment

        syncPayments(
            source: String!
        ): String

        deletePaymentById(id: Int!): String
        
        updatePaymentById(
            id:Int!,
            updateFields: PaymentInput!,
        ): Payment

        convertUSDtoSATS(
            amount: Float!
        ): Float!

        sendPayment(
            contributors: [ContributorInput]
        ): [BTCPayment]
    }

`
