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
                <Grid item xs={12} md={6} lg={4}>
                    <Box mt={2}>
                        <PaymentTile
                            payment={p}
                            client={p.client}
                            project={project}
                        />
                    </Box>
                </Grid>
            )
        })
    }

    return (
        <Grid container justify='flex-start' className='PaymentsList'>
            {renderPaymentTiles(payments)}
        </Grid>
    )
}

export default PaymentsList
