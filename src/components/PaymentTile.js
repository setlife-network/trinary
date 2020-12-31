import React, { useState } from 'react';
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const PaymentTile = (props) => {

    const { client, payment } = props

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    return (
        <Box
            boxShadow={3}
            borderRadius='borderRadius'
            bgcolor='primary.light'
            px={3}
            py={1}
            mx={1}
            className='PaymentTile'
        >
            <Grid container alignItems='baseline'>
                <Grid item xs={5} align='left'>
                    <Typography variant='h6'>
                        {
                            `${client.currency != 'USD'
                                ? ''
                                : '$'}
                        ${payment.amount}`
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
                    <MonetizationOnIcon
                        color={`${paymentHasBeenMade ? 'primary' : 'secondary'}`}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

PaymentTile.defaultProps = {

};

export default PaymentTile;
