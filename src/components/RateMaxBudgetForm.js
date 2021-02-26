import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography
} from '@material-ui/core/'
import moment from 'moment'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { selectCurrencyInformation } from '../scripts/selectors'

const RateMaxBudgetForm = (props) => {

    const {
        currency,
        currentRate,
        currentTotal,
        createRate,
        endDate,
        setNewAllocationRate,
        startDate
    } = props

    const [totalAmount, setTotalAmount] = useState(currentTotal ? currentTotal / 100 : 0)
    const [currentRateInput, setCurrentRateInput] = useState(null)
    const [totalWeeks, setTotalWeeks] = useState(null)
    const [totalHours, setTotalHours] = useState(0)

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
    }, [currentRate])

    useEffect(() => {
        setTotalHours(totalAmount && currentRateInput ? ((totalAmount / 100) / currentRateInput).toFixed(2) : 0)
        setNewAllocationRate({
            hourly_rate: currentRateInput,
            total_amount: totalAmount,
            type: 'max_budget'
        })
    }, [totalAmount, currentRateInput])

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
    }, [startDate, endDate])

    const handleTotalAmountChange = (input) => {
        const amount = Number(input.replace(/\D/g, ''))
        setTotalAmount(amount)
    }

    const currencyInformation = selectCurrencyInformation({
        currency: currency
    })

    return (
        <Grid container className='RateMaxBudgetForm'>
            <Grid item xs={12}>
                <Box my={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Hourly rate'
                                variant='filled'
                                value={`${currentRateInput}`}
                                fullWidth
                                onChange={(event) => setCurrentRateInput(event.target.value)}
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
                <Box mb={2} mt={1}>
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
        </Grid>
    )
}

export default RateMaxBudgetForm
