import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import EditPayment from '../components/EditPayment'

class EditPaymentPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params
        const { paymentId } = this.props.match.params

        return (
            <Grid
                contaniner
                align='center'
                className='EditPaymentPage'
            >
                <Grid item xs={10}>
                    <Typography align='left'>
                        <strong>
                            {`Edit the details of the payment below`}
                        </strong>
                    </Typography>
                    <Box mt={5}>
                        <EditPayment clientId={clientId} paymentId={paymentId}/>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default EditPaymentPage
