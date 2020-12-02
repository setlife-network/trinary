import { gql } from '@apollo/client';

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
