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

import AllocationAddForm from './AllocationAddForm'
import {
    GET_PAYMENT_ALLOCATIONS,
    GET_PAYMENT_TOTAL_ALLOCATED
} from '../operations/queries/PaymentQueries'
import { selectCurrencySymbol } from '../scripts/selectors'
import { red } from '../styles/colors.scss'

const PaymentTile = (props) => {

    const { client, payment, project } = props

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null
    const currencySymbol = selectCurrencySymbol({ currency: client.currency })

    const { loading: loadingPaymentAllocations, error: errorPaymentAllocations, data: dataPaymentAllocations } = useQuery(GET_PAYMENT_ALLOCATIONS, {
        variables: { paymentId: Number(payment.id) }
    })
    const { loading: loadingTotalAllocated, error: errorTotalAllocated, data: dataTotalAllocated } = useQuery(GET_PAYMENT_TOTAL_ALLOCATED, {
        variables: { paymentId: Number(payment.id) }
    })

    const [paymentClicked, setPaymentClicked] = useState(null)
    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setPaymentClicked(props.payment)
    }

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }

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
                        <Grid items xs={10} >
                            <Typography color='secondary' variant='caption'>
                                {`${contributor.name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} align='right'>
                            <Typography color='secondary' variant='caption'>
                                {`${currencySymbol}${amount}`}
                            </Typography>
                        </Grid>
                        <Grid items xs={7}>
                            <Typography color='secondary' variant='caption'>
                                {`${currencySymbol}${rate.hourly_rate}/hr (
                                    ${rate.type == 'monthly_rate' ? 'monthly rate' : 'max budget'}
                                )`}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} align='right'>
                            <Typography color='secondary' variant='caption'>
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
            <Accordion
                disabled={!project}
                className={!project && 'disabled-tile'}
            >
                <AccordionSummary
                    expandIcon={
                        project &&
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
                        {project &&

                            <Grid item xs={12}>
                                <Typography variant='subtitle1'>
                                    <Box
                                        align='left'
                                        color={`${!totalAllocated || totalAllocated > payment.amount ? 'red' : 'primary'}`}
                                    >
                                        {`
                                        ${currencySymbol}${totalAllocated} allocated to ${numberOfContributorsAllocated}
                                        ${numberOfContributorsAllocated == 1 ? 'contributor' : 'contributors'}
                                    `}
                                    </Box>
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </AccordionSummary>
                {project &&
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
                                    onClick={() => addAllocation({ payment })}
                                >
                                    <Typography>
                                        {`Allocate`}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                }
            </Accordion>
            {
                (paymentClicked && project) &&
                <AllocationAddForm
                    project={project}
                    open={openAddAllocationDialog}
                    onClose={handleAddAllocationClose}
                    payment={paymentClicked}
                />
            }
        </Box>
    )
}

export default PaymentTile
