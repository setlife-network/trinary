import { gql } from '@apollo/client'

export const CREATE_CLIENT = gql`
    mutation CreateClient($name: String!, $email: String, $currency: String) {
        createClient(createFields:{
           name: $name,
           email: $email,
           currency: $currency,
           is_active: true
         }){
           id,
           name,
           email,
           currency
         }
    }
`

export const UPDATE_CLIENT = gql`
    mutation UpdateClient($id: Int!, $name: String, $email: String, $currency: String) {
        updateClientById(
            id: $id,
            updateFields: {
            name: $name,
            email: $email,
            currency: $currency,
            is_active: true
        }){
            id,
            name,
            email,
            currency
        }
    }
`
