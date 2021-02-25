import React from 'react'
import {
    Box,
    Dialog,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core/'
import moment from 'moment'

import EditAllocation from './EditAllocation'
import { formatAmount, selectCurrencyInformation } from '../scripts/selectors'

const AllocationOverview = (props) => {

    const {
        allocation,
        onClose,
        open
    } = props

    console.log('allocation');
    console.log(allocation);

    const currencyInformation = selectCurrencyInformation({
        currency: allocation.project.client.currency
    })
    const paymentAmount = formatAmount({
        amount: allocation.payment.amount / 100,
        currencyInformation: currencyInformation
    })

    /*
    __typename: "Allocation"
    amount: 320000
    contributor: {__typename: "Contributor", id: 197, name: "Oscar Lafarga"}
    end_date: "1617148800000"
    id: 189
    rate: {__typename: "Rate", id: 215, hourly_rate: "20", total_expected_hours: 160, type: "prorated_monthly"}
    start_date: "1614556800000"
    */

    return (
        <Dialog className='AllocationOverview' onClose={onClose} open={open}>
            <DialogTitle>
                {`Allocation Detail`}
            </DialogTitle>
            <Box m={5}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography>
                            {`Project`}
                        </Typography>
                        <Typography color='primary'>
                            {`${allocation.project.name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Contributor`}
                            <Typography color='primary'>
                                {`${allocation.contributor.name}`}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Client`}
                        </Typography>
                        <Typography color='primary'>
                            {`${allocation.project.client.name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`Payment`}
                        </Typography>
                        <Typography color='primary'>
                            {`${paymentAmount}`}
                        </Typography>
                        <Typography color='secondary' variant='caption'>
                            {`Date paid: ${
                                allocation.payment.date_paid
                                    ? moment(allocation.payment.date_paid, 'x').format('MM/DD/YYYY')
                                    : `Not paid`
                            }`}
                        </Typography>
                    </Grid>
                </Grid>
                <Box my={3}>
                    <hr/>
                </Box>
                <Grid container>
                    <EditAllocation
                        allocation={allocation}
                        currency='USD'
                        rate={allocation.rate}
                        onClose={onClose}
                    />
                </Grid>
            </Box>
        </Dialog>
    )
}

export default AllocationOverview
