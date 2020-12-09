import React, { useState } from 'react';
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const PaymentTile = (props) => {
    const { payment } = props

    const formattedDatePaid = moment.unix(payment.date_paid).format('MM/DD/YYYY')
    const formattedDateIncurred = moment.unix(payment.date_incurred).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    return (
        <Box
            display='flex'
            boxShadow={3}
            borderRadius='borderRadius'
            bgcolor='primary.light'
            px={3}
            py={1}
            mx={1}
            className='PaymentTile'
        >
            <Grid container alignItems='baseline'>
                <Grid item xs={3}>
                    <Typography variant='h6'>
                        {`$ ${payment.amount}`}
                    </Typography>
                </Grid>
                <Grid item>
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
                        className={
                            `${paymentHasBeenMade
                                ? 'MoneyIcon'
                                : 'NoMoneyIcon'
                            }`
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

PaymentTile.defaultProps = {

};

export default PaymentTile;
