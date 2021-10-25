import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import AddPaymentForm from '../components/AddPaymentForm'

class AddPaymentPage extends React.Component {

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
                        <AddPaymentForm clientId={clientId}/>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default AddPaymentPage
