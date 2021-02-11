import React from 'react'
import {
    Box,
    Card,
    Grid,
    Typography
} from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import accounting from 'accounting-js'
import moment from 'moment'

import { selectCurrencyInformation } from '../scripts/selectors'
import { orange, red } from '../styles/colors.scss'

const AllocationTile = (props) => {

    const {
        allocation
    } = props

    const currencyInformation = selectCurrencyInformation({
        currency: 'USD'
    })
    //TODO: Replacethe following function with upcoming selecto formatAmount (currently on different pr)
    const formatPaymentAmount = (props) => {
        const { amount, currencyInformation } = props
        return accounting.formatMoney(
            amount,
            {
                symbol: currencyInformation['symbol'],
                thousand: currencyInformation['thousand'],
                decimal: currencyInformation['decimal'],
                format: '%s %v'
            }
        )
    }
    const paymentAmount = formatPaymentAmount({
        amount: allocation.amount / 100,
        currencyInformation: currencyInformation
    })
    const futureAllocation = moment(allocation.start_date, 'x').isAfter(moment(), 'days')
    const weeksOfdDifference = moment(allocation.end_date, 'x').diff(moment(), 'weeks')

    return (

        <Box p={2} boxShadow={3} borderRadius='borderRadius'>
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <AccountBalanceWalletIcon color='primary'/>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant={'h6'}>
                        {`${paymentAmount}`}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' color='secondary'>
                        <strong>
                            {`${allocation.project.name}`}
                        </strong>
                    </Typography>
                    <Typography variant='caption' color='secondary'>
                        {`${allocation.project.client.name}`}
                    </Typography>
                </Grid>
                <Box my={5}/>
                <Grid item xs={6}>
                    <Box color={
                        `${!allocation.date_paid
                            ? 'seccondary.light'
                            : futureAllocation
                                ? `${orange}`
                                : 'primary.main'
                        }`}
                    >
                        <Typography
                            variant='subtitle1'
                        >
                            {`Start:`}
                            <br/>
                            <strong>
                                {`${moment(allocation.start_date, 'x').format('MM/DD/YYYY')}`}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box color={
                        `${!allocation.date_paid
                            ? 'seccondary.light'
                            : weeksOfdDifference == 2
                                ? `${red}`
                                : futureAllocation
                                    ? `${orange}`
                                    : 'primary.main'
                        }`}
                    >
                        <Typography
                            variant='subtitle1'
                        >
                            {`End:`}
                            <br/>
                            <strong>
                                {`${moment(allocation.end_date, 'x').format('MM/DD/YYYY')}`}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default AllocationTile
