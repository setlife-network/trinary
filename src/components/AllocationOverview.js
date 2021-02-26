import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core/'
import moment from 'moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import EditAllocation from './EditAllocation'
import LoadingProgress from './LoadingProgress'
import { GET_ALLOCATION_INFO } from '../operations/queries/AllocationQueries'
import { GET_PAYMENT_ALLOCATIONS } from '../operations/queries/PaymentQueries'
import { GET_PROJECT_PAYMENTS } from '../operations/queries/ProjectQueries'
import { DELETE_ALLOCATION } from '../operations/mutations/AllocationMutations'
import { formatAmount, selectCurrencyInformation } from '../scripts/selectors'

const AllocationOverview = (props) => {

    const {
        allocationInfo,
        onClose,
        open
    } = props

    const {
        data: dataAllocation,
        error: errorAllocation,
        loading: loadingAllocation
    } = useQuery(GET_ALLOCATION_INFO, {
        variables: {
            id: allocationInfo.id
        }
    })

    const [deleteAllocation, {
        dataDeletedPayment,
        loadingDeletedPayment,
        errorDeletedPayment
    }] = useMutation(DELETE_ALLOCATION, {
        variables: {
            id: allocationInfo.id
        },
        refetchQueries: [{
            query: GET_PROJECT_PAYMENTS,
            variables: {
                id: dataAllocation ? dataAllocation.getAllocationById.project.id : null
            }
        }, {
            query: GET_PAYMENT_ALLOCATIONS,
            variables: {
                paymentId: dataAllocation ? dataAllocation.getAllocationById.payment.id : null
            }
        }]
    })

    const [openDeleteAllocation, setOpenDeleteAllocation] = useState(false)

    const handleDeleteAllocation = async () => {
        const paymentDeleted = await deleteAllocation()
        onClose()
    }

    if (loadingAllocation) return <LoadingProgress/>
    if (errorAllocation) return `Error ${errorAllocation}`

    const { getAllocationById: allocation } = dataAllocation

    const currencyInformation = selectCurrencyInformation({
        currency: allocation.project.client.currency
    })
    const paymentAmount = formatAmount({
        amount: allocation.payment.amount / 100,
        currencyInformation: currencyInformation
    })

    return (
        <Dialog className='AllocationOverview' onClose={onClose} open={open}>
            <DialogTitle>
                {`Allocation Detail`}
            </DialogTitle>
            <Box m={5}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography>
                            {`Project`}
                        </Typography>
                        <Typography color='primary'>
                            {`${allocation.project.name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Contributor`}
                            <Typography color='primary'>
                                {`${allocation.contributor.name}`}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Client`}
                        </Typography>
                        <Typography color='primary'>
                            {`${allocation.project.client.name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Payment`}
                        </Typography>
                        <Typography color='primary'>
                            {`${paymentAmount}`}
                        </Typography>
                        <Typography color='secondary' variant='caption'>
                            {`Date paid: ${
                                allocation.payment.date_paid
                                    ? moment(allocation.payment.date_paid, 'x').format('MM/DD/YYYY')
                                    : `Not paid`
                            }`}
                        </Typography>
                    </Grid>
                </Grid>
                <Box my={3}>
                    <hr/>
                </Box>
                <EditAllocation
                    allocation={allocation}
                    currency={allocation.project.client.currency}
                    rate={allocation.rate}
                    onClose={onClose}
                />
                <Box mt={1}>
                    <Button
                        color='primary'
                        onClick={() => setOpenDeleteAllocation(true)}
                    >
                        <DeleteOutlinedIcon color='primary'/>
                    </Button>
                </Box>
                <DeleteConfirmationDialog
                    deleteAction={() => handleDeleteAllocation()}
                    deleteItem={`allocation`}
                    open={openDeleteAllocation}
                    onClose={() => setOpenDeleteAllocation(false)}
                />
            </Box>
        </Dialog>
    )
}

export default AllocationOverview
