import { gql } from '@apollo/client';

export const GET_CLIENT_PAYMENTS = gql`
    query ClientPayments($clientId: Int!) {
        getClientPaymentsByClientId(
            clientId: $clientId
        ) {
            id
            amount
            date_incurred
            date_paid
            external_uuid
            external_uuid_type
            client {
                id
                name
                currency
            }
        }
    }
`
export const GET_PAYMENT_DETAILS = gql`
    query getPaymentAndClientDetails($clientId: Int!, $paymentId: Int!)
    {
        getPaymentById(id: $paymentId)
        {
            id
            amount
            client_id
            date_incurred
            date_paid
            bitcoinCheckoutUrl
            isBitcoinInvoiceExpired
        }
        getClientById(id: $clientId)
        {
            id
            currency
        }
    }
`

export const GET_PAYMENT_TOTAL_ALLOCATED = gql`
    query PaymentTotalAllocated($paymentId: Int!){
        getPaymentById(id: $paymentId){
            id
            amount
            totalAllocated
        }
    }
`

export const GET_PAYMENT_ALLOCATIONS = gql`
    query PaymentAllocations($paymentId: Int!){
        getPaymentById(id: $paymentId){
            id
            allocations {
                id
                amount
                start_date
                end_date
                project {
                    name
                }
                contributor {
                    id
                    name
                }
                rate {
                    id
                    hourly_rate
                    total_expected_hours
                    type
                }
            }
        }
    }
`
