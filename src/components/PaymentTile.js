import React, { useState } from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import accounting from 'accounting-js'

import { selectCurrencyInformation } from '../scripts/selectors'

const PaymentTile = (props) => {

    const {
        client,
        payment
    } = props

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null
    const currencyInformation = selectCurrencyInformation({
        currency: client.currency
    })

    const paymentAmount = accounting.formatMoney(
        payment.amount / 100,
        {
            symbol: currencyInformation['symbol'],
            thousand: currencyInformation['thousand'],
            decimal: currencyInformation['decimal'],
            format: '%s %v'
        }
    )

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
            <Grid container alignItems='baseline'>
                <Grid item xs={7} align='left'>
                    <Box overflow='hidden' textOverflow='ellipsis'>
                        <Typography variant='h6'>
                            {
                                `${paymentAmount}`
                            }
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={2} align='right'>
                    <MonetizationOnIcon
                        color={`${paymentHasBeenMade ? 'primary' : 'secondary'}`}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PaymentTile
