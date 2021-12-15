import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    Snackbar
} from '@material-ui/core/'
import Alert from '@material-ui/lab/Alert'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import LoadingProgress from './LoadingProgress'
import { EDIT_PAYMENT } from '../operations/mutations/PaymentMutations'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const PaymentEditDialog = (props) => {

    const {
        payment,
        onClose,
        onOpen
    } = props

    const currencyInformation = selectCurrencyInformation({
        currency: payment.client.currency
    })
    const history = useHistory()

    const [editPayment, {
        dataPayment,
        loadingPayment,
        errorPayment
    }] = useMutation(EDIT_PAYMENT)

    const [dateIncurred, setDateIncurred] = useState(null)
    const [datePaid, setDatePaid] = useState(null)
    const [disableEdit, setDisableEdit] = useState(true)
    const [displayError, setDisplayError] = useState(false)
    const [editPaymentError, setEditPaymentError] = useState('')
    const [invalidPaymentAmountInput, setInvalidPaymentAmountInput] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayError(false)
    }
    const handleEditPayment = async () => {
        const variables = {
            id: Number(payment.id),
            amount: paymentAmount,
            date_incurred: dateIncurred,
            date_paid: datePaid
        }
        const editedPayment = await editPayment({
            variables: variables
        })
        if (loadingPayment) return <LoadingProgress/>
        if (editedPayment.errors) {
            setEditPaymentError(`${Object.keys(editedPayment.errors[0].extensions.exception.fields)[0]}`)
            setDisplayError(true)
        } else {
            onClose()

        }
    }
    const handleDateIncurredChange = (date) => {
        setDateIncurred(moment(date['_d']).format('YYYY-MM-DD'))
    }
    const handleDatePaidChange = (date) => {
        setDatePaid(moment(date['_d']).format('YYYY-MM-DD'))
    }
    const handlePaymentAmountChange = (input) => {
        setInvalidPaymentAmountInput(false)
        const amount = typeof input == 'string' ? Number(input.replace(/\D/g, '')) : input
        setPaymentAmount(amount)
    }

    useEffect(() => {
        if (!dateIncurred || !paymentAmount) {
            setDisableEdit(true)
        } else if (
            dateIncurred == moment.utc(payment.date_incurred, 'x').format('YYYY-MM-DD') &&
            datePaid == moment.utc(payment.date_paid, 'x').format('YYYY-MM-DD') &&
            paymentAmount == payment.amount
        ) {
            setDisableEdit(true)
        } else {
            setDisableEdit(false)
        }
    })

    useEffect(() => {
        handlePaymentAmountChange(payment.amount)
        setDateIncurred(moment.utc(payment.date_incurred, 'x').format('YYYY-MM-DD'))
        setDatePaid(
            payment.date_paid
                ? moment.utc(payment.date_paid, 'x').format('YYYY-MM-DD')
                : null
        )
    }, [onOpen])

    return (
        <Dialog
            className='PaymentEditDialog'
            onClose={onClose}
            open={onOpen}
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
                                        defaultValue={paymentAmount / 100}
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
                            onClick={handleEditPayment}
                            disabled={disableEdit}
                        >
                            {`Save payment`}
                        </Button>
                    </Box>
                </FormControl>
            </Box>
            <Snackbar
                open={displayError}
                autoHideDuration={4000}
                onClose={handleAlertClose}
            >
                <Alert severity='error'>
                    {`${editPaymentError}`}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}

export default PaymentEditDialog
