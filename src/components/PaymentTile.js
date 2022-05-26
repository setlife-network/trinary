import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { orderBy, filter } from 'lodash'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Typography,
    Tooltip
} from '@material-ui/core/'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import EditIcon from '@material-ui/icons/Edit'
import EditIconOutlined from '@material-ui/icons/EditOutlined'

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

const PaymentTile = (props) => {

    const {
        client,
        payment,
        project
    } = props

    const formattedDatePaid = moment.utc(parseInt(payment.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment.utc(parseInt(payment.date_incurred, 10)).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    const {
        loading: loadingPaymentAllocations,
        error: errorPaymentAllocations,
        data: dataPaymentAllocations
    } = useQuery(GET_PAYMENT_ALLOCATIONS, {
        fetchPolicy: 'cache-and-network',
        variables: { paymentId: Number(payment.id) }
    })
    const {
        loading: loadingTotalAllocated,
        error: errorTotalAllocated,
        data: dataTotalAllocated
    } = useQuery(GET_PAYMENT_TOTAL_ALLOCATED, {
        fetchPolicy: 'cache-and-network',
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
    const orderedAllocations = orderBy(allocations, ['project.name'], ['desc'])
    const filteredAllocations = project ? filter(allocations, ['project.name', project.name]) : null
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
        const projects = []
        let projectTitle = null

        return allocations.map((a, i) => {
            const {
                amount,
                contributor,
                end_date,
                rate
            } = a
            const projectName = a.project.name
            const paymentAmount = formatAmount({
                amount: parseFloat(amount / 100).toFixed(2),
                // amount: parseFloat((amount / 100).toFixed(2)).toString(),
                currencyInformation: currencyInformation
            })

            if (!projects.includes(projectName) && !project) {
                projects.push(projectName)
                projectTitle = projectName
            } else {
                projectTitle = null
            }

            return (
                <Box 
                    mb={3} 
                    className='PaymentTile' 
                >
                    {!project &&
                        <Grid item xs={12} align='center'>
                            <Typography 
                                variant='h6'
                                className='project-name'
                            >
                                {projectTitle}
                            </Typography>
                        </Grid>
                    }
                    <Grid
                        container
                        className='payments-grid'
                        onClick={() => handleAllocationClicked({ value: true, allocation: a })}
                    >
                        <Grid items xs={6}>
                            <Typography color='secondary' variant='caption' className='animation-effect-left'>
                                {`${contributor.name}`}
                            </Typography>
                        </Grid>
                        <Grid className='edit-button-grid' item xs={6} align='right'>
                            <EditIcon 
                                color='primary' 
                                className='edit-button' 
                            />
                        </Grid>
                        <Grid items xs={12}>
                            <Typography color='secondary' variant='caption' className='animation-effect-left'>
                                {`${currencyInformation['symbol']} ${rate.hourly_rate}/hr (
                                    ${rate.type == 'prorated_monthly' ? 'monthly rate' : 'max budget'}
                                )`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color='secondary' variant='caption' className='animation-effect-left'>
                                {`${paymentAmount}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align='right'>
                            <Typography color='secondary' variant='caption' className='animation-effect-right'>
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
                            <Grid item xs={1}>
                                <ExpandMoreIcon />
                            </Grid>
                        }
                        IconButtonProps={{
                            style: {
                                // position: 'absolute'
                            }
                        }}
                    >
                        <Grid container alignItems='center'>
                            <Grid item xs={6} align='left' data-testid='payment-tile-amount'>
                                <Typography variant='h6'>
                                    {`${paymentAmount}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} align='right'>
                                <Box mb={0.75} data-testid='payment-tile-date'>
                                    <Typography
                                        variant='caption'
                                        color='secondary'
                                    >
                                        {`${paymentHasBeenMade
                                            ? formattedDatePaid
                                            : formattedDateIncurred}`
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1} align='right'>
                                <MonetizationOnIcon
                                    color={`${paymentHasBeenMade ? 'primary' : 'secondary'}`}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    mt={2}
                                    align='left'
                                    color={`${!totalAllocated || totalAllocated > payment.amount ? 'red' : 'primary.main'}`}
                                >
                                    <Typography variant='subtitle2'>
                                        {`${totalAllocated} allocated`}
                                        <br/>
                                        {`to ${numberOfContributorsAllocated} ${numberOfContributorsAllocated == 1 ? 'contributor' : 'contributors'}`}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    {!project &&
                        <Box align='left' mb={2} mx={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    {renderPaymentAllocations({
                                        allocations: orderedAllocations,
                                        currencyInformation: currencyInformation
                                    })}
                                </Grid>
                                <Grid item xs={8}>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        onClick={() => addAllocation({ payment })}
                                    >
                                        <Typography>
                                            {`Allocate`}
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                    <Tooltip 
                                        title='This payment cannot be edited because it is linked to a Stripe Invoice' 
                                        disableHoverListener={payment.external_uuid_type ? false : true}
                                        placement='top'
                                    >
                                        <span>
                                            <Button
                                                color='primary'
                                                onClick={() => handleEditPayment(true)}
                                                disabled={payment.external_uuid_type}
                                            >
                                                <EditIconOutlined />
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={2} align='right'>
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
                                        allocations: filteredAllocations,
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
            {paymentClicked &&
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
