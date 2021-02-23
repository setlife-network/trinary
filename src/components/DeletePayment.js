import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
    Grid,
    Typography
} from '@material-ui/core/'

import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import { DELETE_PAYMENT } from '../operations/mutations/PaymentMutations'

const DeletePayment = (props) => {

    const {
        onClose,
        open,
        payment
    } = props

    const [deletePayment, {
        dataDeletedPayment,
        loadingDeletedPayment,
        errorDeletedPayment
    }] = useMutation(DELETE_PAYMENT)

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
                payment={payment}
                open={open}
                onClose={onClose}
            />
        </Grid>
    )
}

export default DeletePayment
