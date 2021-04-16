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
        endDate,
        rate,
        selectedPayment,
        setEndDate,
        setNewAllocationRate,
        setSelectedCurrency,
        setStartDate,
        startDate
    } = props

    const [selectedRateType, setSelectedRateType] = useState(rate.type)

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    return (
        <Box className='EditAllocationRate'>
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
                                        ? moment.utc(startDate).format('MM/DD/YYYY')
                                        : 'Start date'
                                } - ${
                                    endDate
                                        ? moment.utc(endDate).format('MM/DD/YYYY')
                                        : ' End date'
                                }`}
                            </Box>
                        }
                    />
                </Grid>
            </Grid>
            {selectedRateType == 'prorated_monthly'
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
