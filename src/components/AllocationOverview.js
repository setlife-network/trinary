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
import EditAllocationInfo from './EditAllocationInfo'
import EditAllocationRate from './EditAllocationRate'
import LoadingProgress from './LoadingProgress'
import { GET_ALLOCATIONS, GET_ALLOCATION_INFO } from '../operations/queries/AllocationQueries'
import { GET_CLIENT_PAYMENTS } from '../operations/queries/ClientQueries'
import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import { GET_PAYMENT_ALLOCATIONS } from '../operations/queries/PaymentQueries'
import { GET_PROJECT_CONTRIBUTORS, GET_PROJECT_PAYMENTS } from '../operations/queries/ProjectQueries'
import { DELETE_ALLOCATION } from '../operations/mutations/AllocationMutations'

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

    const {
        data: dataClientPayments,
        loading: loadingClientPayments,
        error: errorClientPayments
    } = useQuery(GET_CLIENT_PAYMENTS, {
        variables: {
            clientId: allocationInfo.project.client.id
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
            query: GET_ALLOCATIONS,
            variables: {
                projectId: allocationInfo.project.id,
                contributorId: allocationInfo.contributor.id
            }
        }, {
            query: GET_PROJECT_CONTRIBUTORS,
            variables: {
                id: allocationInfo.project.id
            }
        }]
    })

    const [openDeleteAllocation, setOpenDeleteAllocation] = useState(false)

    const handleDeleteAllocation = async () => {
        const paymentDeleted = await deleteAllocation()
        onClose()
    }

    if (loadingAllocation || loadingClientPayments) return <LoadingProgress/>
    if (errorAllocation || errorClientPayments) return `Error`

    const { getAllocationById: allocation } = dataAllocation
    const { getClientById: client } = dataClientPayments

    return (
        <Dialog className='AllocationOverview' onClose={onClose} open={open}>
            <DialogTitle>
                {`Allocation Detail`}
            </DialogTitle>
            <Box m={5}>
                <EditAllocationInfo allocation={allocation} payments={[...client.payments, { amount: null, date_paid: null }]}/>
                <Box my={3}>
                    <hr/>
                </Box>
                <EditAllocationRate
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
