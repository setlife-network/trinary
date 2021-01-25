import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { GET_PAYMENT_TOTAL_ALLOCATED } from '../operations/queries/PaymentQueries'

const PaymentTile = (props) => {

    const { client, payment } = props

    const { loading: loadingTotalAllocated, error: errorTotalAllocated, data: dataTotalAllocated } = useQuery(GET_PAYMENT_TOTAL_ALLOCATED, {
        variables: { paymentId: Number(payment.id) }
    })

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    if (loadingTotalAllocated) return 'Loading...'
    if (errorTotalAllocated) return `An error ocurred: ${errorTotalAllocated}`

    const { totalAllocated } = dataTotalAllocated.getPaymentById

    return (
        <Box
            borderRadius='borderRadius'
            bgcolor='primary.light'
            mx={1}
            className='PaymentTile'
        >
            <Accordion>
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon />
                    }
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
                        <Grid item xs={12}>
                            <Typography variant='subtitle1' color='primary'>
                                {`$${totalAllocated} allocated`}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default PaymentTile
