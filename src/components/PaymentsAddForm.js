import React, { useState } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography
} from '@material-ui/core'
import accounting from 'accounting-js'

const PaymentsAddForm = (props) => {

    const {
        client
    } = props

    //amount
    //date incurred
    //date paid

    const [paymentAmount, setPaymentAmount] = useState(null)

    return (
        <Grid container spacing={5}>
            <Grid item xs={5}>
                <TextField
                    label='Total amount'
                    variant='filled'
                    fullWidth
                />
            </Grid>
            <Grid item xs={`${paymentAmount}`}>
            </Grid>
        </Grid>
    )
}

export default PaymentsAddForm
