import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import PaymentsList from './PaymentsList'
import PaymentsEmptyState from './PaymentsEmptyState'
import { GET_CLIENT_PAYMENTS } from '../operations/queries/PaymentQueries'

const ClientPayments = (props) => {

    const { clientId } = props

    const { loading, error, data } = useQuery(GET_CLIENT_PAYMENTS, {
        variables: { clientId: Number(clientId) }
    })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

    const payments = orderBy(data.getClientPaymentsByClientId, ['date_paid'], ['desc'])

    return (
        payments.length != 0
            ? (
                <PaymentsList
                    payments={payments}
                />
            ) : (
                <PaymentsEmptyState/>
            )
    )

}

export default ClientPayments
