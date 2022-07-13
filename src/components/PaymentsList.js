import React, { useState } from 'react'
import {
    Box,
    Grid
} from '@material-ui/core'

import PaymentTile from './PaymentTile'

const PaymentsList = (props) => {

    const {
        payments,
        project
    } = props

    const renderPaymentTiles = (payments) => {
        return payments.map(p => {
            return (
                <Grid item xs={12} md={6}>
                    <Box mt={2}>
                        <PaymentTile
                            payment={p}
                            client={p.client}
                            project={project}
                            active={Number(localStorage.getItem('openPayment')) == p.id ? true : false}
                        />
                    </Box>
                </Grid>
            )
        })
    }

    return (
        <Grid container justifyContent='flex-start' className='PaymentsList'>
            {renderPaymentTiles(payments)}
        </Grid>
    )
}

export default PaymentsList
