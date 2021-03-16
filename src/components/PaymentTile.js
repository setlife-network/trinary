import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Fab,
    Grid,
    Typography
} from '@material-ui/core/'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import AllocationAddForm from './AllocationAddForm'
import AllocationOverview from './AllocationOverview'
import DeletePayment from './DeletePayment'
import PaymentEditDialog from './PaymentEditDialog'
import {
    GET_PAYMENT_ALLOCATIONS,
    GET_PAYMENT_TOTAL_ALLOCATED
} from '../operations/queries/PaymentQueries'
import {
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'
import { red } from '../styles/colors.scss'

const PaymentTile = (props) => {

    const {
        client,
        payment,
        project
    } = props

    const formattedDatePaid = moment(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    const {
        loading: loadingPaymentAllocations,
        error: errorPaymentAllocations,
        data: dataPaymentAllocations
    } = useQuery(GET_PAYMENT_ALLOCATIONS, {
        variables: { paymentId: Number(payment.id) }
    })
    const {
        loading: loadingTotalAllocated,
        error: errorTotalAllocated,
        data: dataTotalAllocated
    } = useQuery(GET_PAYMENT_TOTAL_ALLOCATED, {
        variables: { paymentId: Number(payment.id) }
    })

    const [paymentClicked, setPaymentClicked] = useState(null)
    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)
    const [openAllocationOverview, setOpenAllocationOverview] = useState(false)
    const [openDeletePayment, setOpenDeletePayment] = useState(false)
    const [openEditPayment, setOpenEditPayment] = useState(false)
    const [selectedAllocation, setSelectedAllocation] = useState(null)

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setPaymentClicked(props.payment)
    }
    const handleAllocationClicked = ({ value, allocation }) => {
        setSelectedAllocation(allocation)
        setOpenAllocationOverview(value)
    }
    const handleAddAllocationClose = () => {
        setOpenAddAllocationDialog(false)
    }
    const handleDeletePayment = (value) => {
        setOpenDeletePayment(value)
    }
    const handleEditPayment = (value) => {
        setOpenEditPayment(value)
    }
    const currencyInformation = selectCurrencyInformation({
        currency: client.currency
    })

    if (loadingTotalAllocated || loadingPaymentAllocations) return ''
    if (errorTotalAllocated || errorPaymentAllocations) return `An error ocurred`

    const { allocations } = dataPaymentAllocations.getPaymentById
    const totalAllocated = formatAmount({
        amount: dataTotalAllocated.getPaymentById.totalAllocated / 100,
        currencyInformation: currencyInformation
    })
    const paymentAmount = formatAmount({
        amount: payment.amount / 100,
        currencyInformation: currencyInformation
    })
    const numberOfContributorsAllocated = allocations.length

    const renderPaymentAllocations = (props) => {

        const {
            allocations,
            currencyInformation
        } = props

        return allocations.map((a, i) => {
            const {
                amount,
                contributor,
                end_date,
                rate
            } = a
            const paymentAmount = formatAmount({
                amount: amount / 100,
                currencyInformation: currencyInformation
            })

            return (
                <Box mb={3}>
                    <Grid
                        container
                        onClick={() => handleAllocationClicked({ value: true, allocation: a })}
                    >
                        <Grid items xs={10} >
                            <Typography color='secondary' variant='caption'>
                                {`${contributor.name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} align='right'>
                            <Typography color='secondary' variant='caption'>
                                {`${paymentAmount}`}
                            </Typography>
                        </Grid>
                        <Grid items xs={7}>
                            <Typography color='secondary' variant='caption'>
                                {`${currencyInformation['symbol']}${rate.hourly_rate}/hr (
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
        <div>
            <Box
                borderRadius='borderRadius'
                bgcolor='primary.light'
                mx={1}
                className='PaymentTile'
            >
                <Accordion>
                    <AccordionSummary
                        expandIcon={
                            project &&
                            <ExpandMoreIcon />
                        }
                    >
                        <Grid container alignItems='center'>
                            <Grid item xs={5} align='left'>
                                <Typography variant='h6'>
                                    {`${paymentAmount}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography
                                    variant='caption'
                                    align='left'
                                    color='secondary'
                                >
                                    {`${paymentHasBeenMade
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
                                            color={`${!totalAllocated || totalAllocated > payment.amount ? 'red' : 'primary.main'}`}
                                        >
                                            {`
                                                ${totalAllocated}
                                                ${numberOfContributorsAllocated && `allocated to ${numberOfContributorsAllocated}`}
                                                ${numberOfContributorsAllocated == 1 ? 'contributor' : 'contributors'}
                                            `}
                                        </Box>
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                    </AccordionSummary>
                    {!project &&
                        <Box align='left' mb={2} ml={2}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button
                                        color='primary'
                                        onClick={() => handleEditPayment(true)}
                                    >
                                        {'Edit Payment'.toUpperCase()}
                                    </Button>
                                </Grid>
                                <Grid item xs={6} align='right'>
                                    <Button
                                        color='primary'
                                        onClick={() => handleDeletePayment(true)}
                                    >
                                        <DeleteOutlinedIcon color='primary'/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {project &&
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12}>
                                    {renderPaymentAllocations({
                                        allocations: allocations,
                                        currencyInformation: currencyInformation
                                    })}
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
            </Box>
            {(paymentClicked && project) &&
                <AllocationAddForm
                    client={client}
                    project={project ? project : null}
                    open={openAddAllocationDialog}
                    onClose={handleAddAllocationClose}
                    payment={paymentClicked}
                />
            }
            <PaymentEditDialog
                payment={payment}
                onOpen={openEditPayment}
                onClose={() => handleEditPayment(false)}
            />
            {selectedAllocation &&
                <AllocationOverview
                    allocationInfo={selectedAllocation}
                    onClose={() => handleAllocationClicked(false)}
                    onOpen={openAllocationOverview}
                />
            }
            <DeletePayment
                client={client}
                open={openDeletePayment}
                onClose={() => handleDeletePayment(false)}
                payment={payment}
            />
        </div>
    )
}

export default PaymentTile
