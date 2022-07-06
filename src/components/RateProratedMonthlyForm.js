import React, { useEffect, useState } from 'react'
import {
    Box,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core/'
import Advanced from './Advanced'

import { CURRENCIES } from '../constants'
import {
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'
import { validatePositiveNumbers } from '../scripts/validation'

const RateProratedMonthlyForm = (props) => {

    const {
        clientCurrency,
        currentRate,
        endDate,
        selectedPayment,
        setNewAllocationRate,
        setCurrency,
        startDate
    } = props

    const [monthlyHoursInput, setMonthlyhoursInput] = useState(null)
    const [currentRateInput, setCurrentRateInput] = useState(null)
    const [error, setError] = useState(false)
    const [rateCurrency, setRateCurrency] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const [totalWeeks, setTotalWeeks] = useState(null)
    const [totalHours, setTotalHours] = useState(0)
    const [minimumExpectedHours, setMinimumExpectedHours] = useState(null)
    const [maximumExpectedHours, setMaximumExpectedHours] = useState(null)

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
        setMonthlyhoursInput(currentRate ? currentRate.total_expected_hours : 160)
        setRateCurrency(currentRate ? currentRate.currency : clientCurrency)
        setMinimumExpectedHours(currentRate ? currentRate.minimum_expected_hours : '')
        setMaximumExpectedHours(currentRate ? currentRate.maximum_expected_hours : '')
    }, [currentRate])

    useEffect(() => {
        if (selectedPayment) {
            setRateCurrency(clientCurrency)
        }
    }, [selectedPayment])

    useEffect(() => {
        if (!rateCurrency) {
            setRateCurrency(clientCurrency)
        }
        setCurrency(rateCurrency)
    }, [rateCurrency])

    useEffect(() => {
        setTotalAmount(currentRateInput * monthlyHoursInput)
    }, [monthlyHoursInput, currentRateInput])

    useEffect(() => {
        setTotalHours(
            totalAmount && currentRateInput
                ? (totalAmount / currentRateInput).toFixed(2)
                : 0
        )
        setNewAllocationRate({
            hourly_rate: currentRateInput,
            total_expected_hours: monthlyHoursInput,
            total_amount: totalAmount * 100,
            type: 'prorated_monthly'
        })
    }, [totalAmount])

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
    }, [startDate, endDate])

    const currencyInformation = selectCurrencyInformation({
        currency: rateCurrency ? rateCurrency : 'USD'
    })
    const paymentAmount = formatAmount({
        amount: totalAmount,
        currencyInformation: currencyInformation
    })

    const renderCurrencies = (currencies) => {
        return (
            currencies.map(c => {
                return (
                    <MenuItem value={c.name}>
                        {c.name}
                    </MenuItem>
                )
            })
        )
    }

    const handleHoursChange = (value, monthlyOrRate) => {
        if (monthlyOrRate) {
            if (value % 1 == 0) {
                setError(null)
            } else {
                setError('Decimals not allowed')
            }
            setMonthlyhoursInput(
                validatePositiveNumbers(value, monthlyHoursInput)
            )
        } else {
            setCurrentRateInput(
                validatePositiveNumbers(value, currentRateInput)
            )
        }
    }

    return (
        <Grid container className='RateProratedMonthlyForm'>
            <Grid item xs={6} md={5}>
                <Box width={1} mt={3}>
                    <Select
                        name='Currency'
                        fullWidth
                        onChange={(event) => setRateCurrency(event.target.value)}
                        value={selectedPayment ? clientCurrency : rateCurrency}
                        disabled={selectedPayment}
                    >
                        {renderCurrencies(CURRENCIES)}
                    </Select>
                    <FormHelperText>
                        {`Select currency`}
                    </FormHelperText>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box my={3}>
                    <Grid container justifyContent='left' spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Expected hours'
                                variant='filled'
                                defaultValue='0'
                                value={`${monthlyHoursInput}`}
                                fullWidth
                                error={error}
                                helperText={error}
                                onChange={(event) => handleHoursChange(event.target.value, true)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Hourly rate'
                                variant='filled'
                                value={`${currentRateInput}`}
                                fullWidth
                                onChange={(event) => handleHoursChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Total amount'
                                variant='filled'
                                value={`${paymentAmount}`}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={1}>
                    <Typography>
                        {`Total hours per week = ${Math.trunc((totalHours / totalWeeks))}`}
                    </Typography>
                </Box>
            </Grid>
            <Box>
                <Advanced 
                    minimumExpectedHours={minimumExpectedHours}
                    maximumExpectedHours={maximumExpectedHours}
                    setMinimumExpectedHours={setMinimumExpectedHours}
                    setMaximumExpectedHours={setMaximumExpectedHours}
                    type={'prorated_monthly'}
                />
            </Box>
        </Grid>
    )
}

export default RateProratedMonthlyForm
