import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
    Grid,
    Typography
} from '@material-ui/core/'

import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import { GET_CLIENT_PAYMENTS } from '../operations/queries/PaymentQueries'
import { GET_CLIENT_TOTAL_PAID } from '../operations/queries/ClientQueries'
import { DELETE_PAYMENT } from '../operations/mutations/PaymentMutations'

const DeletePayment = (props) => {

    const {
        client,
        onClose,
        open,
        payment
    } = props

    const [deletePayment, {
        dataDeletedPayment,
        loadingDeletedPayment,
        errorDeletedPayment
    }] = useMutation(DELETE_PAYMENT, {
        refetchQueries: [GET_CLIENT_TOTAL_PAID, {
            query: GET_CLIENT_PAYMENTS,
            variables: {
                clientId: Number(client.id)
            }
        }]
    })

    const handleDeletePayment = async () => {
        const paymentDeleted = await deletePayment({
            variables: {
                paymentId: Number(payment.id)
            }
        })
    }

    return (
        <Grid container>
            <DeleteConfirmationDialog
                deleteAction={() => handleDeletePayment()}
                deleteItem={`payment`}
                open={open}
                onClose={onClose}
            />
        </Grid>
    )
}

export default DeletePayment
