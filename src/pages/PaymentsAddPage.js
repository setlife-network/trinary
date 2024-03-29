import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import Header from '../components/Header'
import PaymentsAddForm from '../components/PaymentsAddForm'

class PaymentsAddPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params

        return (
            <Grid
                contaniner
                align='center'
                className='PaymentsAdd'
            >
                <Grid item xs={10}>
                    <Typography align='left'>
                        <strong>
                            {`Enter info below to add a payment`}
                        </strong>
                    </Typography>
                    <Box mt={5}>
                        <PaymentsAddForm clientId={clientId}/>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default PaymentsAddPage
