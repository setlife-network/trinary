import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
    Button,
    FormControl,
    Grid,
    Snackbar,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import LoadingProgress from './LoadingProgress'
import { GET_PAYMENT_DETAILS } from '../operations/queries/PaymentQueries'
import { EDIT_PAYMENT } from '../operations/mutations/PaymentMutations'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const AddPaymentForm = (props) => {

    const history = useHistory()

    const {
        clientId, paymentId
    } = props

    const {
        loading, 
        error, 
        data } = useQuery(GET_PAYMENT_DETAILS, 
        { variables: 
            { 
                clientId: Number(clientId),
                paymentId: Number(paymentId) 
            } 
        })

    const [editPayment, {
        dataPayment,
        loadingPayment,
        errorPayment
    }] = useMutation(EDIT_PAYMENT)

    const [createPaymentError, setCreatePaymentError] = useState('')
    const [dateIncurred, setDateIncurred] = useState('')
    const [datePaid, setDatePaid] = useState('')
    const [disableAdd, setDisableAdd] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    const [invalidPaymentAmountInput, setInvalidPaymentAmountInput] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)
    const [disableEdit, setDisableEdit] = useState(true)
    const [editPaymentError, setEditPaymentError] = useState('')
    
    useEffect(() => {
        if (!dateIncurred || !paymentAmount) {
            setDisableEdit(true)
        } else {
            setDisableEdit(false)
        }
        if (dateIncurred && paymentAmount) {
            setDisableAdd(false)
        }
    })

    useEffect(() => {
        if (!loading) {
            setDateIncurred(formattedDateIncurred)
            setDatePaid(formattedDatePaid)
            setPaymentAmount(Number(getPaymentById.amount) / 100)
        } 
    }, [loading])

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${errorPayment}`

    const { getPaymentById, getClientById } = data
    const formattedDatePaid = moment.utc(parseInt(getPaymentById.date_paid, 10)).format('MM/DD/YYYY')
    const formattedDateIncurred = moment.utc(parseInt(getPaymentById.date_incurred, 10)).format('MM/DD/YYYY')

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayError(false)
    }
    const handleEditPayment = async () => {
        const variables = {
            id: Number(paymentId),
            amount: paymentAmount,
            client_id: Number(clientId),
            date_incurred: dateIncurred,
            date_paid: datePaid
        }
        const updatePayment = await editPayment({ variables })
        if (loadingNewPayment) return <LoadingProgress/>
        if (newPayment.errors) {
            setCreatePaymentError(`${Object.keys(newPayment.errors[0].extensions.exception.fields)[0]}`)
            setDisplayError(true)
        } else {
            history.push(`/clients/${clientId}`)
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
        const amount = Number(input.replace(/\D/g, ''))
        setPaymentAmount(amount)
    }

    const currencyInformation = getPaymentById.client_id === getClientById.id ? selectCurrencyInformation({
        currency: getClientById.currency
    }) :
        null

    return (
        <FormControl
            fullWidth
            align='left'
        >   
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={6} lg={4}>
                            <CurrencyTextField
                                fullWidth
                                label='Payment amount'
                                variant='outlined'
                                currencySymbol={`${currencyInformation['symbol']}`}
                                minimumValue='0'
                                outputFormat='string'
                                decimalCharacter={`${currencyInformation['decimal']}`}
                                digitGroupSeparator={`${currencyInformation['thousand']}`}
                                value={paymentAmount}
                                onChange={handlePaymentAmountChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
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
                <Grid item xs={12} sm={6} lg={4}>
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
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={disableAdd}
                        onClick={handleEditPayment}
                    >
                        {`Change Payment`}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={displayError}
                autoHideDuration={4000}
                onClose={handleAlertClose}
            >
                <Alert severity='error'>
                    {`${createPaymentError}`}
                </Alert>
            </Snackbar>
        </FormControl>
    )
}

export default AddPaymentForm
