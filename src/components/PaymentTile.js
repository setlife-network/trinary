import React, { useState } from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone'

import { selectCurrencySymbol } from '../scripts/selectors'

const PaymentTile = (props) => {

    const {
        client,
        payment
    } = props

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    return (
        <Box
            boxShadow={3}
            borderRadius='borderRadius'
            bgcolor='primary.light'
            px={3}
            py={2}
            mx={1}
            className='PaymentTile'
        >
            <Grid container alignItems='center'>
                <Grid item xs={5} align='left'>
                    <Typography variant='h6'>
                        {
                            `${selectCurrencySymbol({ currency: client.currency })} ${payment.amount}`
                        }
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography
                        variant='caption'
                        align='left'
                        color='secondary'
                    >
                        {
                            `${paymentHasBeenMade
                                ? formattedDatePaid
                                : formattedDateIncurred}`
                        }
                    </Typography>
                </Grid>
                <Grid item xs={6} align='right'>
                    <MonetizationOnTwoToneIcon
                        color={`${paymentHasBeenMade ? 'primary' : 'secondary'}`}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PaymentTile
