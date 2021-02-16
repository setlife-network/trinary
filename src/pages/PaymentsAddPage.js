import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import Header from '../components/Header'
import PaymentsAddForm from '../components/PaymentsAddForm'

const PaymentsAddPage = (props) => {

    return (
        <Grid
            contaniner
            align='center'
            className='PaymentsAdd'
        >
            <Header
                title='Add Payment'
                direction='row'
                justify='center'
                alignItems='center'
            />
            <Grid item xs={8}>
                <Typography align='left'>
                    <strong>
                        {`Enter info below to add a payment`}
                    </strong>
                </Typography>
                <Box mt={5}>
                    <PaymentsAddForm/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PaymentsAddPage
