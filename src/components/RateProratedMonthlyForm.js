import React, { useState } from 'react'
import {
    Box,
    FormControl,
    Grid,
    TextField
} from '@material-ui/core/'

const RateProratedMonthlyForm = (props) => {

    const [totalAmount, setTotalAmount] = useState(null)

    return (
        <Grid container className='RateProratedMonthlyForm'>
            <Grid item>
                <Box my={3}>
                    <FormControl>
                        <Grid container justify='left' spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField label='Expected monthly hours' variant='filled'/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Hourly rate' variant='filled'/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label={`${totalAmount ? totalAmount : 'Project Total'}`}
                                    variant='filled'
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
