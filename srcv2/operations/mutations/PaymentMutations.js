import { gql } from '@apollo/client'

export const CREATE_PAYMENT = gql`
    mutation CreatePayment($project_id: Int!, $amount: Int!, $date_incurred: String!, $date_paid: String, $currency: String, $contributor_id: Int) {
        createPayment(createFields: {
            amount: $amount
            project_id: $project_id
            date_incurred: $date_incurred
            date_paid: $date_paid
            currency: $currency
            contributor_id: $contributor_id
        }){
            id
            amount
        }
    }
`

export const UPDATE_PAYMENT = gql`
    mutation UpdatePayment($id: Int!, $amount: Int!, $date_incurred: String!, $date_paid: String) {
        updatePaymentById(
            id: $id, 
            updateFields: {
                amount: $amount
                date_incurred: $date_incurred
                date_paid: $date_paid
            }
        ) {
            id
            amount
            date_incurred
            date_paid
        }
    }
`

export const CREATE_BITCOIN_INVOICE = gql`
    mutation GenerateBitcoinInvoice($paymentId: Int!){
        generateBitcoinInvoiceFromPayment(paymentId: $paymentId){
            external_uuid
            bitcoinCheckoutUrl
        }
    }
`