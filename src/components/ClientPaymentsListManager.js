import React from 'react'
import { gql, useQuery } from '@apollo/client';

import PaymentList from './PaymentList'
import { GET_CLIENT_PAYMENTS } from '../operations/queries/PaymentQueries'

const ClientPaymentsListManager = (props) => {

    const { clientId } = props

    const { loading, error, data } = useQuery(GET_CLIENT_PAYMENTS, {
        variables: { clientId: Number(clientId) }
    })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (error) return `Error! ${error.message}`;

    const { getClientPaymentsByClientId } = data

    return (

        getClientPaymentsByClientId.length != 0
            ? (
                <PaymentList
                    payments={getClientPaymentsByClientId}
                />
            )
            : (
                //TODO: Create empty state
                <p>
                    No payments to display
                </p>
            )
    )

}

export default ClientPaymentsListManager
