import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography
} from '@material-ui/core/'
import {
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'

const RateProratedMonthlyForm = (props) => {

    const {
        currency,
        currentRate,
        endDate,
        setNewAllocationRate,
        startDate
    } = props

    const [totalAmount, setTotalAmount] = useState(null)
    const [monthlyHoursInput, setMonthlyhoursInput] = useState(null)
    const [currentRateInput, setCurrentRateInput] = useState(null)
    const [totalWeeks, setTotalWeeks] = useState(null)
    const [totalHours, setTotalHours] = useState(0)

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'days') / 7)
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
        setMonthlyhoursInput(currentRate ? currentRate.total_expected_hours : 160)
    }, [currentRate])

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
        currency: currency ? currency : 'USD'
    })
    const paymentAmount = formatAmount({
        amount: totalAmount,
        currencyInformation: currencyInformation
    })

    return (
        <Grid container className='RateProratedMonthlyForm'>
            <Grid item xs={12}>
                <Box my={3}>
                    <Grid container justify='left' spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Expected monthly hours'
                                variant='filled'
                                defaultValue='0'
                                value={`${monthlyHoursInput}`}
                                fullWidth
                                onChange={(event) => setMonthlyhoursInput(event.target.value)}
                            />
                        </Grid>
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
                <Box mb={2} mt={1}>
                    <Typography>
                        {`Total hours per week = ${Math.trunc((totalHours / totalWeeks))}`}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RateProratedMonthlyForm
