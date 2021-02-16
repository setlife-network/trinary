import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    FormControl,
    Grid,
    TextField,
    Typography
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import accounting from 'accounting-js'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const PaymentsAddForm = (props) => {

    const {
        clientId
    } = props

    const {
        data: dataClient,
        error: errorClient,
        loading: loadingProject
    } = useQuery(GET_CLIENT_INFO, {
        variables: {
            id: Number(clientId)
        }
    })

    const createPayment = () => {

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

    //amount
    //date incurred
    //date paid

    const [dateIncurred, setDateIncurred] = useState(null)
    const [datePaid, setDatePaid] = useState(null)
    const [disableAdd, setDisableAdd] = useState(true)
    const [invalidPaymentAmountInput, setInvalidPaymentAmountInput] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)

    useEffect(() => {
        if (dateIncurred && paymentAmount) {
            setDisableAdd(false)
        }
    })

    if (loadingProject) return 'Loading...'
    if (errorClient) return `Error! ${errorClient}`

    const { getClientById: client } = dataClient

    const currencyInformation = selectCurrencyInformation({
        currency: client.currency
    })

    return (
        <FormControl
            fullWidth
            align='left'
        >
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <CurrencyTextField
                        fullWidth
                        label='Payment amount'
                        variant='outlined'
                        currencySymbol={`${currencyInformation['symbol']}`}
                        minimumValue='0'
                        outputFormat='string'
                        decimalCharacter={`${currencyInformation['decimal']}`}
                        digitGroupSeparator={`${currencyInformation['thousand']}`}
                        onChange={(event) => handlePaymentAmountChange(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                        onClick={createPayment}
                    >
                        {`Add Payment`}
                    </Button>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default PaymentsAddForm
