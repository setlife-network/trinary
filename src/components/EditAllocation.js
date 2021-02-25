import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography
} from '@material-ui/core/'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { findKey } from 'lodash'

import LoadingProgress from './LoadingProgress'
import RateProratedMonthlyForm from './RateProratedMonthlyForm'
import RateMaxBudgetForm from './RateMaxBudgetForm'
import { GET_CONTRIBUTOR_RATES } from '../operations/queries/ContributorQueries'
import { CREATE_RATE } from '../operations/mutations/RateMutations'
import { UPDATE_ALLOCATION } from '../operations/mutations/AllocationMutations'

const EditAllocation = (props) => {

    const {
        allocation,
        currency,
        rate,
        onClose
    } = props

    const {
        data: dataContributorRates,
        loading: loadingContributorRates,
        error: errorContributorRates
    } = useQuery(GET_CONTRIBUTOR_RATES, {
        variables: {
            id: allocation.contributor.id
        }
    })

    const [createRate, {
        dataNewRate,
        loadingNewRate,
        errorNewRate
    }] = useMutation(CREATE_RATE)

    const [updateAllocation, {
        dataUpdatedAllocation,
        loadingUpdatedAllocation,
        errorUpdatedAllocation
    }] = useMutation(UPDATE_ALLOCATION)

    const [endDate, setEndDate] = useState(moment(allocation.end_date, 'x')['_d'])
    const [newAllocationRate, setNewAllocationRate] = useState({})
    const [selectedRateType, setSelectedRateType] = useState(rate.type)
    const [startDate, setStartDate] = useState(moment(allocation.start_date, 'x')['_d'])

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }
    const handleUpdateAllocation = async ({
        allocation,
        contributor,
        contributorRates,
        rate,
        startDate,
        endDate
    }) => {
        //look for rate with same values
        const selectedRate = {}
        const existingRate = findKey(
            contributorRates,
            {
                'hourly_rate': rate.hourly_rate.toString(),
                'total_expected_hours': Number(rate.total_expected_hours),
                'type': rate.type
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
                rate_id: Number(selectedRate.id)
            }
        })
        if (loadingUpdatedAllocation) return ''
        else if (updatedAllocation.errors) {
            console.log('Error updating the allocation');
        } else {
            onClose()
        }
    }

    if (loadingContributorRates) return <LoadingProgress/>
    if (errorContributorRates) return `${errorContributorRates}`

    const { getContributorById: contributorRates } = dataContributorRates

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <ButtonGroup color='primary' aria-label='outlined primary button group'>
                        <Button
                            variant={`${selectedRateType == 'prorated_monthly' ? 'contained' : 'outlined'}`}
                            color='primary'
                            onClick={() => setSelectedRateType('prorated_monthly')}
                        >
                            {'Prorated monthly'}
                        </Button>
                        <Button
                            variant={`${selectedRateType == 'max_budget' ? 'contained' : 'outlined'}`}
                            color='primary'
                            onClick={() => setSelectedRateType('max_budget')}
                        >
                            {'Max Budget'}
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        shouldCloseOnSelect={startDate && !endDate}
                        selectsRange
                        onChange={(date) => getRangedTimeEntries(date)}
                        customInput={
                            <Box
                                px={2}
                                py={1}
                                boxShadow={3}
                                mt={3}
                                borderRadius='borderRadius'
                                bgcolor='primary.light'
                            >
                                {`${
                                    startDate
                                        ? moment(startDate).format('MM/DD/YYYY')
                                        : 'Start date'
                                } - ${
                                    endDate
                                        ? moment(endDate).format('MM/DD/YYYY')
                                        : ' End date'
                                }`}
                            </Box>
                        }
                    />
                </Grid>
            </Grid>
            {
                selectedRateType == 'prorated_monthly'
                    ? (
                        <RateProratedMonthlyForm
                            currency={currency}
                            currentRate={rate}
                            setNewAllocationRate={setNewAllocationRate}
                            startDate={moment(startDate)}
                            endDate={moment(endDate)}
                        />
                    ) : (
                        <RateMaxBudgetForm
                            currency={currency}
                            currentRate={rate}
                            setNewAllocationRate={setNewAllocationRate}
                            startDate={moment(startDate)}
                            endDate={moment(endDate)}
                        />
                    )
            }
            <Grid container>
                <Grid item xs={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleUpdateAllocation({
                            allocation: allocation,
                            contributor: allocation.contributor,
                            contributorRates: contributorRates.rates,
                            rate: newAllocationRate,
                            startDate: startDate,
                            endDate: endDate
                        })}
                    >
                        {'Edit'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

}

// allocation,
// contributor,
// contributorRates,
// rate,
// startDate,
// endDate

export default EditAllocation
