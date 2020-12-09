import React from 'react'
import Grid from '@material-ui/core/Grid'

import PaymentTile from './PaymentTile'

const PaymentsList = (props) => {

    const {
        payments
    } = props

    const renderPaymentTiles = (payments) => {
        return payments.map(p => {
            return (
                <Grid item xs={12} lg={4} className='PaymentsList'>
                    <PaymentTile payment={p}/>
                </Grid>
            )
        })
    }

    return (
        <Grid container>
            {renderPaymentTiles(payments)}
        </Grid>
    )
}

export default PaymentsList
