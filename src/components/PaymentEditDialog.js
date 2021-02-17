import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid
} from '@material-ui/core/'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import {
    selectCurrencyInformation
} from '../scripts/selectors'

const PaymentEditDialog = (props) => {

    const {
        payment,
        onClose,
        open
    } = props

    const currencyInformation = selectCurrencyInformation({
        currency: payment.client.currency
    })

    const [createPaymentError, setCreatePaymentError] = useState('')
    const [dateIncurred, setDateIncurred] = useState(null)
    const [datePaid, setDatePaid] = useState(null)
    const [disableAdd, setDisableAdd] = useState(true)
    const [displayError, setDisplayError] = useState(false)
    const [invalidPaymentAmountInput, setInvalidPaymentAmountInput] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)

    const handleDateIncurredChange = (date) => {
        setDateIncurred(moment(date['_d']).format('YYYY-MM-DD'))
    }
    const handleDatePaidChange = (date) => {
        setDatePaid(moment(date['_d']).format('YYYY-MM-DD'))
    }
    const handlePaymentAmountChange = (input) => {
        setInvalidPaymentAmountInput(false)
        const amount = typeof input == 'string' ? Number(input.replace(/\D/g, '')) : (input / 100)
        setPaymentAmount(amount)
    }

    useEffect(() => {
        handlePaymentAmountChange(payment.amount)
        setDateIncurred(moment(payment.date_incurred, 'x').format('MM/DD/YYYY'))
        setDatePaid(moment(payment.date_paid, 'x').format('MM/DD/YYYY'))
    }, [open])

    return (
        <Dialog
            className='PaymentEditDialog'
            onClose={onClose}
            open={open}
        >
            <Box mx={5} my={3}>
                <DialogTitle>
                    {`Edit Payment`}
                </DialogTitle>
                <FormControl>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <CurrencyTextField
                                        fullWidth
                                        label='Payment amount'
                                        variant='outlined'
                                        currencySymbol={`${currencyInformation['symbol']}`}
                                        minimumValue='0'
                                        outputFormat='string'
                                        decimalCharacter={`${currencyInformation['decimal']}`}
                                        digitGroupSeparator={`${currencyInformation['thousand']}`}
                                        defaultValue={paymentAmount}
                                        onChange={(event) => handlePaymentAmountChange(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant='inline'
                                    format='MM/DD/YYYY'
                                    margin='normal'
                                    label='Payment date incurred'
                                    value={dateIncurred}
                                    onChange={handleDateIncurredChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant='inline'
                                    format='MM/DD/YYYY'
                                    margin='normal'
                                    label='Payment date paid'
                                    value={datePaid}
                                    onChange={handleDatePaidChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Button
                            variant='contained'
                            color='primary'
                        >
                            {`Edit payment`}
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default PaymentEditDialog
