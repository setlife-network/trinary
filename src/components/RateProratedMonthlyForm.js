import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    TextField
} from '@material-ui/core/'

const RateProratedMonthlyForm = (props) => {

    const { currentRate, setNewAllocationRate } = props

    const [totalAmount, setTotalAmount] = useState(null)
    const [monthlyHoursInput, setMonthlyhoursInput] = useState(null)
    const [currentRateInput, setCurrentRateInput] = useState(null)

    useEffect(() => {
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
        setMonthlyhoursInput(currentRate ? currentRate.monthly_hours : 160)
    }, [])

    useEffect(() => {
        setTotalAmount(currentRateInput * monthlyHoursInput)
    }, [monthlyHoursInput, currentRateInput])

    useEffect(() => {
        setNewAllocationRate({
            hourly_rate: currentRateInput,
            monthly_hours: monthlyHoursInput,
            total_amount: totalAmount,
            type: 'prorated_monthly'
        })
    }, [totalAmount])

    return (
        <Grid container className='RateProratedMonthlyForm'>
            <Grid item xs={12}>
                <Box my={3}>
                    <Grid container justify='left' spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Expected monthly hours'
                                variant='filled'
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
                                value={`${totalAmount}`}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RateProratedMonthlyForm
