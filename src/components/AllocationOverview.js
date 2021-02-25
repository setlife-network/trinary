import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
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
import { DELETE_ALLOCATION } from '../operations/mutations/AllocationMutations'
import { formatAmount, selectCurrencyInformation } from '../scripts/selectors'

const AllocationOverview = (props) => {

    const {
        allocation,
        onClose,
        open
    } = props

    const [deleteAllocation, {
        dataDeletedPayment,
        loadingDeletedPayment,
        errorDeletedPayment
    }] = useMutation(DELETE_ALLOCATION, {
        variables: {
            id: allocation.id
        }
    })

    const [openDeleteAllocation, setOpenDeleteAllocation] = useState(false)

    const currencyInformation = selectCurrencyInformation({
        currency: allocation.project.client.currency
    })
    const paymentAmount = formatAmount({
        amount: allocation.payment.amount / 100,
        currencyInformation: currencyInformation
    })
    const handleDeleteAllocation = async () => {
        const paymentDeleted = await deleteAllocation()
        onClose()
        console.log('paymentDeleted');
        console.log(paymentDeleted);
    }

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
                <Button
                    color='primary'
                    onClick={() => setOpenDeleteAllocation(true)}
                >
                    <DeleteOutlinedIcon color='primary'/>
                </Button>
                <DeleteConfirmationDialog
                    deleteAction={() => handleDeleteAllocation()}
                    deleteItem={`allocation`}
                    open={openDeleteAllocation}
                    onClose={handleDeleteAllocation}
                />
            </Box>
        </Dialog>
    )
}

export default AllocationOverview
