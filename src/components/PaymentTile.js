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

import {
    GET_PAYMENT_ALLOCATIONS,
    GET_PAYMENT_TOTAL_ALLOCATED
} from '../operations/queries/PaymentQueries'
import { selectCurrencySymbol } from '../scripts/selectors'
import { red } from '../styles/colors.scss'

const PaymentTile = (props) => {

    const { client, payment } = props

    const { loading: loadingPaymentAllocations, error: errorPaymentAllocations, data: dataPaymentAllocations } = useQuery(GET_PAYMENT_ALLOCATIONS, {
        variables: { paymentId: Number(payment.id) }
    })
    const { loading: loadingTotalAllocated, error: errorTotalAllocated, data: dataTotalAllocated } = useQuery(GET_PAYMENT_TOTAL_ALLOCATED, {
        variables: { paymentId: Number(payment.id) }
    })

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null
    const currencySymbol = selectCurrencySymbol({ currency: client.currency })

    if (loadingTotalAllocated || loadingPaymentAllocations) return 'Loading...'
    if (errorTotalAllocated || errorPaymentAllocations) return `An error ocurred`

    const { totalAllocated } = dataTotalAllocated.getPaymentById
    const { allocations } = dataPaymentAllocations.getPaymentById

    const numberOfContributorsAllocated = allocations.length

    const renderPaymentAllocations = (allocations) => {
        return allocations.map(a => {
            const { amount, contributor, end_date, rate } = a
            return (
                <Box mb={3}>
                    <Grid container>
                        <Grid items xs={10}>
                            <Typography color='secondary'>
                                {`${contributor.name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color='secondary'>
                                {`${currencySymbol}${amount}`}
                            </Typography>
                        </Grid>
                        <Grid items xs={8}>
                            <Typography color='secondary'>
                                {`${currencySymbol}${rate.hourly_rate}/hr (
                                    ${rate.type == 'monthly_rate' ? 'monthly rate' : 'max budget'}
                                )`}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography color='secondary'>
                                {`Ends ${moment(end_date, 'x').format('MM/DD/YYYY')} `}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            )
        })
    }

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
                    <Grid container alignItems='center'>
                        <Grid item xs={5} align='left'>
                            <Typography variant='h6'>
                                {
                                    `${currencySymbol}${payment.amount}`
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
                            <Typography variant='subtitle1'>
                                <Box color={`${!totalAllocated || totalAllocated > payment.amount ? 'red' : 'primary'}`}>
                                    {`
                                        ${currencySymbol}${totalAllocated} allocated to ${numberOfContributorsAllocated}
                                        ${numberOfContributorsAllocated == 1 ? 'contributor' : 'contributors'}
                                    `}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12}>
                            {renderPaymentAllocations(allocations)}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                color='primary'
                                variant='outlined'
                                onClick={() => (console.log('CClick'))}
                            >
                                <Typography>
                                    {`Allocate`}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default PaymentTile
