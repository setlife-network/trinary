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
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Advanced from './Advanced'

import { CURRENCIES } from '../constants'
import { selectCurrencyInformation } from '../scripts/selectors'
import { validatePositiveNumbers } from '../scripts/validation'

const RateMaxBudgetForm = (props) => {

    const {
        clientCurrency,
        currentRate,
        currentTotal,
        createRate,
        endDate,
        selectedPayment,
        setCurrency,
        setNewAllocationRate,
        startDate
    } = props

    const [currentRateInput, setCurrentRateInput] = useState(null)
    const [rateCurrency, setRateCurrency] = useState(clientCurrency)
    const [totalAmount, setTotalAmount] = useState(currentTotal ? currentTotal : 0)
    const [totalWeeks, setTotalWeeks] = useState(null)
    const [totalHours, setTotalHours] = useState(0)
    const [minimumHourlyRate, setMinimumHourlyRate] = useState(null)
    const [maximumHourlyRate, setMaximumHourlyRate] = useState(null)

    useEffect(() => {
        if (rateCurrency) {
            setCurrency(rateCurrency)
        }
    }, [rateCurrency])

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
        setRateCurrency(currentRate ? currentRate.currency : clientCurrency)
        setMinimumHourlyRate(currentRate ? currentRate.minimum_hourly_rate : '')
        setMaximumHourlyRate(currentRate ? currentRate.maximum_hourly_rate : '')
    }, [currentRate])

    useEffect(() => {
        if (selectedPayment) {
            setRateCurrency(clientCurrency)
        }
    }, [selectedPayment])

    useEffect(() => {
        setTotalHours(totalAmount && currentRateInput ? ((totalAmount / 100) / currentRateInput).toFixed(2) : 0)
        setNewAllocationRate({
            hourly_rate: currentRateInput,
            total_amount: totalAmount,
            minimum_hourly_rate: minimumHourlyRate,
            maximum_hourly_rate: maximumHourlyRate,
            type: 'max_budget',
        })
    }, [totalAmount, currentRateInput, minimumHourlyRate, maximumHourlyRate])

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
    }, [startDate, endDate])

    const handleTotalAmountChange = (input) => {
        const amount = Number(input.replace(/\D/g, ''))
        setTotalAmount(amount)
    }

    const currencyInformation = selectCurrencyInformation({
        currency: rateCurrency ? rateCurrency : 'USD'
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

    const handleHourlyRateChange = (value) => {
        setCurrentRateInput(
            validatePositiveNumbers(value, currentRateInput)
        )
    }

    return (
        <Grid container className='RateMaxBudgetForm'>
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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Hourly rate'
                                variant='filled'
                                value={`${currentRateInput}`}
                                fullWidth
                                onChange={(event) => handleHourlyRateChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CurrencyTextField
                                fullWidth
                                label='Total amount'
                                variant='filled'
                                currencySymbol={`${currencyInformation['symbol']}`}
                                minimumValue='0'
                                defaultValue={currentTotal / 100}
                                outputFormat='string'
                                decimalCharacter={`${currencyInformation['decimal']}`}
                                digitGroupSeparator={`${currencyInformation['thousand']}`}
                                onChange={(event) => handleTotalAmountChange(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={1}>
                    <Typography>
                        {`Total hours = ${totalHours ? totalHours : 0}`}
                    </Typography>
                    <Typography>
                        {`Hours per week = ${
                            totalHours
                                ? (totalHours / (
                                    totalWeeks
                                        ? totalWeeks
                                        : 1
                                )).toFixed(2)
                                : 0
                        }`}
                    </Typography>
                </Box>
            </Grid>
            <Box>
                <Advanced 
                    minimumHourlyRate={minimumHourlyRate}
                    maximumHourlyRate={maximumHourlyRate}
                    setMinimumHourlyRate={setMinimumHourlyRate}
                    setMaximumHourlyRate={setMaximumHourlyRate}
                    type={'max_budget'}
                />
            </Box>
        </Grid>
    )
}

export default RateMaxBudgetForm
