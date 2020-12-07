import React from 'react'
import Grid from '@material-ui/core/Grid'

import PaymentTile from './PaymentTile'

const PaymentList = (props) => {

    const {
        payments
    } = props

    const renderPaymentTiles = (payments) => {
        return payments.map(p => {
            return (
                <Grid item>
                    <PaymentTile payment={p}/>
                </Grid>
            )
        })
    }

    console.log('PaymentList');
    console.log(payments);

    return (
        <Grid container>
            {renderPaymentTiles(payments)}
        </Grid>
    )
}

export default PaymentList
