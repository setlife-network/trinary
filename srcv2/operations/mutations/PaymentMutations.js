import { gql } from '@apollo/client'

export const CREATE_PAYMENT = gql`
    mutation CreatePayment($project_id: Int!, $amount: Int!, $date_incurred: String!, $date_paid: String, $currency: String) {
        createPayment(createFields: {
            amount: $amount
            project_id: $project_id
            date_incurred: $date_incurred
            date_paid: $date_paid
            currency: $currency
        }){
            id
            amount
        }
    }
`