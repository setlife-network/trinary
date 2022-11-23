import { gql } from '@apollo/client';

export const GET_PAYMENT_DETAILS = gql`
    query getPaymentAndClientDetails($paymentId: Int!) {
        getPaymentById(id: $paymentId) {
            id
            amount
            project_id
            date_incurred
            date_paid
            bitcoinCheckoutUrl
            isBitcoinInvoiceExpired
            currency
        }
    }
`