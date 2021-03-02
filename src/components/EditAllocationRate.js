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
import {
    GET_CONTRIBUTOR_ALLOCATIONS,
    GET_CONTRIBUTOR_RATES
} from '../operations/queries/ContributorQueries'
import { CREATE_RATE } from '../operations/mutations/RateMutations'
import { UPDATE_ALLOCATION } from '../operations/mutations/AllocationMutations'

const EditAllocationRate = (props) => {

    const {
        allocation,
        currency,
        rate,
        //onClose,

        endDate,
        selectedPayment,
        setEndDate,
        setNewAllocationRate,
        setSelectedCurrency,
        setStartDate,
        startDate
    } = props

    // const [createRate, {
    //     dataNewRate,
    //     loadingNewRate,
    //     errorNewRate
    // }] = useMutation(CREATE_RATE)

    // const [updateAllocation, {
    //     dataUpdatedAllocation,
    //     loadingUpdatedAllocation,
    //     errorUpdatedAllocation
    // }] = useMutation(UPDATE_ALLOCATION, {
    //     refetchQueries: [{
    //         query: GET_CONTRIBUTOR_ALLOCATIONS,
    //         variables: {
    //             id: allocation.contributor.id
    //         }
    //     }]
    // })

    //const [endDate, setEndDate] = useState(moment(allocation.end_date, 'x')['_d'])
    //const [newAllocationRate, setNewAllocationRate] = useState({})
    //const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [selectedRateType, setSelectedRateType] = useState(rate.type)
    //const [startDate, setStartDate] = useState(moment(allocation.start_date, 'x')['_d'])

    // console.log('selectedPayment');
    // console.log(selectedPayment);

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

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
                            rateCurrency={rate.currency}
                            clientCurrency={currency}
                            currentRate={rate}
                            selectedPayment={selectedPayment}
                            setNewAllocationRate={setNewAllocationRate}
                            setCurrency={setSelectedCurrency}
                            startDate={moment(startDate)}
                            endDate={moment(endDate)}
                        />
                    ) : (
                        <RateMaxBudgetForm
                            currentTotal={allocation.amount}
                            clientCurrency={currency}
                            currentRate={rate}
                            selectedPayment={selectedPayment}
                            setCurrency={setSelectedCurrency}
                            setNewAllocationRate={setNewAllocationRate}
                            startDate={moment(startDate)}
                            endDate={moment(endDate)}
                        />
                    )
            }
        </Box>
    )

}

export default EditAllocationRate
