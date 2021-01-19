import React, { useEffect, useState } from 'react'
import {
    Box,
    FormControl,
    Grid,
    TextField
} from '@material-ui/core/'

const RateProratedMonthlyForm = (props) => {

    const { currentRate } = props

    const [totalAmount, setTotalAmount] = useState(null)
    const [monthlyHoursInput, setMonthlyhoursInput] = useState(160)
    const [currentRateInput, setCurrentRateInput] = useState(null)

    useEffect(() => {
        setCurrentRateInput(currentRate ? currentRate.hourly_rate : 0)
    }, [])

    useEffect(() => {
        setTotalAmount(currentRateInput * monthlyHoursInput)
    }, [monthlyHoursInput, currentRateInput])

    return (
        <Grid container className='RateProratedMonthlyForm'>
            <Grid item>
                <Box my={3}>
                    <FormControl>
                        <Grid container justify='left' spacing={1}>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    label='Expected monthly hours'
                                    variant='filled'
                                    value={`${monthlyHoursInput}`}
                                    onChange={(event) => setMonthlyhoursInput(event.target.value)}
                                />
                            </Grid>
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
                                    value={`${totalAmount}`}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RateProratedMonthlyForm
