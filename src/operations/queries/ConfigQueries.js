import { gql } from '@apollo/client'

export const HAS_VALID_STRIPE_CREDENTIALS = gql`
    query checkForValidStripeCredentials {
        checkForValidStripeCredentials
    }
`