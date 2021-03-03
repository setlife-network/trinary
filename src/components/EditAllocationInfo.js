import React, { useEffect, useState } from 'react'
import {
    Collapse,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core/'
import PaymentIcon from '@material-ui/icons/Payment'
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons'
import moment from 'moment'
import {
    differenceWith,
    findIndex,
    isEqual
} from 'lodash'

import { formatAmount, selectCurrencyInformation } from '../scripts/selectors'

const EditAllocationInfo = (props) => {

    const {
        allocation,
        payments,
        selectedPayment,
        setSelectedPayment
    } = props

    const currencyInformation = selectCurrencyInformation({
        currency: allocation.project.client.currency
    })

    const [openPayments, setOpenPayments] = useState(false)

    useEffect(() => {
        if (!selectedPayment) {
            setSelectedPayment(payments[findIndex(payments, ['amount', allocation.payment])])
        }
    })

    const handleClickPayments = () => {
        setOpenPayments(!openPayments)
    }
    const onClickPayment = (payment) => {
        if (payment.id) {
            setSelectedPayment(payment)
        } else {
            setSelectedPayment(null)
        }
        setOpenPayments(false)
    }

    const paymentAmount = (
        selectedPayment
            ? selectedPayment.amount
                ? formatAmount({
                    amount: selectedPayment.amount / 100,
                    currencyInformation: currencyInformation
                })
                : 'Proposed'
            : 'Proposed'
    )
    const datePaid = (
        selectedPayment
            ? selectedPayment.date_paid
                ? moment(selectedPayment.date_paid, 'x').format('MM/DD/YYYY')
                : selectedPayment.date_incurred
                    ? 'Warning: This payment has not been paid'
                    : 'Proposed'
            : ''
    )

    const listPayments = (payments) => {
        const paymentsList = differenceWith(payments, [selectedPayment], isEqual)
        return paymentsList.map(p => {
            const paymentAmount = formatAmount({
                amount: p.amount / 100,
                currencyInformation: currencyInformation
            })
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickPayment(p)}>
                        <Grid container>
                            <Grid item xs={6}>
                                <ListItemText
                                    primary={`${
                                        p.amount
                                            ? `${paymentAmount}`
                                            : 'Propose'
                                    }`}
                                />
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${p.date_paid
                                        ? moment(p.date_paid, 'x').format('MM/DD/YYYY')
                                        : ''
                                    }`}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}/>
                        </Grid>
                    </ListItem>
                </List>
            )
        })
    }

    return (
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
                <List component='nav'>
                    <ListItem button onClick={handleClickPayments}>
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography color='primary'>
                                    <ListItemText
                                        primary={`${paymentAmount}`}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={3} align='right'>
                                {openPayments
                                    ? <ExpandLess />
                                    : <ExpandMore />
                                }
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Collapse in={openPayments} timeout='auto' unmountOnExit>
                        {payments.length > 1 &&
                            listPayments(payments)
                        }
                    </Collapse>
                </List>
                <Typography color='secondary' variant='caption'>
                    {`Date paid: ${datePaid}`}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default EditAllocationInfo
