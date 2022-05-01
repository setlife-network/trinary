import { gql } from '@apollo/client';

export const CREATE_BITCOIN_INVOICE = gql`
    mutation GenerateBitcoinInvoice($paymentId: Int!){
        generateBitcoinInvoiceFromPayment(paymentId: $paymentId){
            external_uuid
            bitcoinCheckoutUrl
        }
    }
`

export const CREATE_PAYMENT = gql`
    mutation CreatePayment($client_id: Int!, $amount: Int!, $date_incurred: String!, $date_paid: String) {
        createPayment(createFields: {
            amount: $amount
            client_id: $client_id
            date_incurred: $date_incurred
            date_paid: $date_paid
        }){
            id
            amount
        }
    }
`

export const DELETE_PAYMENT = gql`
    mutation DeletePayment($paymentId: Int!) {
        deletePaymentById(id: $paymentId)
    }
`

export const EDIT_PAYMENT = gql`
    mutation EditPayment($id: Int!, $amount: Int!, $date_incurred: String!, $date_paid: String) {
        updatePaymentById(id: $id, updateFields: {
            amount: $amount
            date_incurred: $date_incurred
            date_paid: $date_paid
        }) {
            id
            amount
            date_incurred
            date_paid
        }
    }
`
