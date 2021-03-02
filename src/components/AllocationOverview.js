import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core/'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import moment from 'moment'
import { findKey } from 'lodash'

import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import EditAllocationInfo from './EditAllocationInfo'
import EditAllocationRate from './EditAllocationRate'
import LoadingProgress from './LoadingProgress'
import { GET_ALLOCATIONS, GET_ALLOCATION_INFO } from '../operations/queries/AllocationQueries'
import { GET_CLIENT_PAYMENTS } from '../operations/queries/ClientQueries'
import { GET_CONTRIBUTORS, GET_CONTRIBUTOR_ALLOCATIONS, GET_CONTRIBUTOR_RATES } from '../operations/queries/ContributorQueries'
import { GET_PAYMENT_ALLOCATIONS } from '../operations/queries/PaymentQueries'
import { GET_PROJECT_CONTRIBUTORS, GET_PROJECT_PAYMENTS } from '../operations/queries/ProjectQueries'
import { DELETE_ALLOCATION, UPDATE_ALLOCATION } from '../operations/mutations/AllocationMutations'
import { CREATE_RATE } from '../operations/mutations/RateMutations'

const AllocationOverview = (props) => {

    const {
        allocationInfo,
        onClose,
        open
    } = props

    const [contributorAllocation, setContributorAllocation] = useState(null)
    const [contributorRates, setContributorRates] = useState(null)
    const [updatedAllocationPayment, setUpdatedAllocationPayment] = useState(null)
    const [updatedAllocationRate, setUpdatedAllocationRate] = useState({})
    const [openDeleteAllocation, setOpenDeleteAllocation] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [updatedAllocationStartDate, setUpdatedAllocationStartDate] = useState(null)
    const [updatedAllocationEndDate, setUpdatedAllocationEndDate] = useState(null)

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

    const [getContributorRates, {
        data: dataContributorRates,
        loading: loadingContributorRates,
        error: errorContributorRates
    }] = useLazyQuery(GET_CONTRIBUTOR_RATES, {
        onCompleted: dataContributorRates => {
            setContributorRates(dataContributorRates)
        }
    })

    const [createRate, {
        dataNewRate,
        loadingNewRate,
        errorNewRate
    }] = useMutation(CREATE_RATE)

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

    const [updateAllocation, {
        dataUpdatedAllocation,
        loadingUpdatedAllocation,
        errorUpdatedAllocation
    }] = useMutation(UPDATE_ALLOCATION, {
        refetchQueries: [{
            query: GET_CONTRIBUTOR_ALLOCATIONS,
            variables: {
                id: contributorAllocation ? contributorAllocation.contributor.id : null
            }
        }]
    })

    useEffect(() => {
        if (contributorAllocation) {
            getContributorRates({
                variables: {
                    id: contributorAllocation.contributor.id
                }
            })
            setUpdatedAllocationEndDate(moment(allocation.end_date, 'x')['_d'])
            setUpdatedAllocationPayment(contributorAllocation.payment)
            setUpdatedAllocationStartDate(moment(allocation.start_date, 'x')['_d'])
        }
    }, [contributorAllocation])

    const handleDeleteAllocation = async () => {
        const paymentDeleted = await deleteAllocation()
        onClose()
    }

    const handleUpdateAllocation = async ({
        allocation,
        contributor,
        contributorRates,
        endDate,
        payment,
        rate,
        startDate,
    }) => {
        console.log('payment');
        console.log(payment);
        console.log(payment.id);
        //look for rate with same values
        const selectedRate = {}
        const existingRate = findKey(
            contributorRates,
            {
                'hourly_rate': rate.hourly_rate.toString(),
                'total_expected_hours': Number(rate.total_expected_hours),
                'type': rate.type,
                'currency': selectedCurrency
            }
        )
        if (existingRate) {
            selectedRate.id = contributorRates[existingRate].id
        } else {
            //create rate
            const newRate = await createRate({
                variables: {
                    hourly_rate: rate.hourly_rate.toString(),
                    total_expected_hours: Number(rate.total_expected_hours),
                    type: rate.type,
                    currency: selectedCurrency,
                    contributor_id: contributor.id
                }
            })
            selectedRate.id = newRate.data.createRate.id
        }
        //update allocation with that rate id
        const updatedAllocation = await updateAllocation({
            variables: {
                id: allocation.id,
                amount: Number(rate.total_amount),
                start_date: moment(startDate).format('YYYY-MM-DD'),
                end_date: moment(endDate).format('YYYY-MM-DD'),
                date_paid: null,
                rate_id: Number(selectedRate.id),
                payment_id: payment.id
            }
        })
        if (loadingUpdatedAllocation) return ''
        else if (updatedAllocation.errors) {
            console.log('Error updating the allocation');
        } else {
            onClose()
        }
    }

    if (loadingAllocation || loadingClientPayments) return <LoadingProgress/>
    if (errorAllocation || errorClientPayments) return `Error`

    const { getAllocationById: allocation } = dataAllocation
    const { getClientById: client } = dataClientPayments

    if (!contributorAllocation) {
        setContributorAllocation(allocation)
    }

    return (
        <Dialog className='AllocationOverview' onClose={onClose} open={open}>
            <DialogTitle>
                {`Allocation Detail`}
            </DialogTitle>
            <Box m={5}>
                <EditAllocationInfo
                    allocation={allocation}
                    payments={[...client.payments, { id: null, amount: null, date_paid: null }]}
                    setSelectedPayment={setUpdatedAllocationPayment}
                    selectedPayment={updatedAllocationPayment}
                />
                <Box my={3}>
                    <hr/>
                </Box>
                <EditAllocationRate
                    allocation={allocation}
                    currency={allocation.project.client.currency}
                    endDate={updatedAllocationEndDate}
                    rate={allocation.rate}
                    setEndDate={setUpdatedAllocationEndDate}
                    setNewAllocationRate={setUpdatedAllocationRate}
                    setSelectedCurrency={setSelectedCurrency}
                    setStartDate={setUpdatedAllocationStartDate}
                    startDate={updatedAllocationStartDate}
                    //onClose={onClose}
                />

                <Box mt={1}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleUpdateAllocation({
                                    allocation: contributorAllocation,
                                    contributor: contributorAllocation.contributor,
                                    contributorRates: dataContributorRates,
                                    endDate: updatedAllocationEndDate,
                                    payment: updatedAllocationPayment,
                                    rate: updatedAllocationRate,
                                    startDate: updatedAllocationStartDate,
                                })}
                            >
                                {'Edit'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color='primary'
                                onClick={() => setOpenDeleteAllocation(true)}
                            >
                                <DeleteOutlinedIcon color='primary'/>
                            </Button>
                        </Grid>
                    </Grid>
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
