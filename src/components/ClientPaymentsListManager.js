import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { orderBy } from 'lodash'

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
    const payments = orderBy(data.getClientPaymentsByClientId, ['date_paid'], ['desc'])

    return (
        payments.length != 0
            ? (
                <PaymentList
                    payments={payments}
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
