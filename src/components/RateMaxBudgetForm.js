import React, { useEffect, useState } from 'react'
import {
    Box,
    FormControl,
    Grid,
    TextField,
    Typography
} from '@material-ui/core/'
import moment from 'moment'

const RateMaxBudgetForm = (props) => {

    const { currentRate, createRate, setNewAllocation, startDate, endDate } = props

    const [totalAmount, setTotalAmount] = useState(0)
    const [currentRateInput, setCurrentRateInput] = useState(null)
    const [totalWeeks, setTotalWeeks] = useState(null)
    const [totalHours, setTotalHours] = useState(0)

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'weeks'))
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
    }, [])

    useEffect(() => {
        setTotalHours(totalAmount && currentRateInput ? (totalAmount / currentRateInput).toFixed(2) : 0)
        setNewAllocation({
            hourly_rate: currentRateInput,
            total_amount: totalAmount,
            type: 'max_budget'
        })
    }, [totalAmount, currentRateInput])

    useEffect(() => {
        setTotalWeeks(endDate.diff(startDate, 'weeks'))
    }, [startDate, endDate])

    return (
        <Grid container className='RateMaxBudgetForm'>
            <Grid item xs={12}>
                <Box my={3}>
                    <FormControl>
                        <Grid container justify='left' spacing={1}>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    label='Hourly rate'
                                    variant='filled'
                                    value={`${currentRateInput}`}
                                    onChange={(event) => setCurrentRateInput(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    label='Total amount'
                                    variant='filled'
                                    defautltValue='0'
                                    value={`${totalAmount ? totalAmount : ''}`}
                                    onChange={(event) => setTotalAmount(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box my={2}>
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
