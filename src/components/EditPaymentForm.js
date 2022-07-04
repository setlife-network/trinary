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
import BtcInvoiceModal from './BtcInvoiceModal'
import { GET_PAYMENT_DETAILS } from '../operations/queries/PaymentQueries'
import { EDIT_PAYMENT, CREATE_BITCOIN_INVOICE } from '../operations/mutations/PaymentMutations'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const EditPaymentForm = (props) => {

    const history = useHistory()

    const {
        clientId, paymentId
    } = props

    const {
        loading, 
        error, 
        data } = useQuery(GET_PAYMENT_DETAILS, 
        { 
            variables: 
            { 
                clientId: Number(clientId),
                paymentId: Number(paymentId) 
            },
        })

    const [editPayment, {
        dataPayment,
        loadingPayment,
        errorPayment
    }] = useMutation(EDIT_PAYMENT)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('');
    const [displayAlert, setDisplayAlert] = useState(false)
    const [dateIncurred, setDateIncurred] = useState(null)
    const [datePaid, setDatePaid] = useState(null)
    const [paymentAmount, setPaymentAmount] = useState(null)
    const [openInvoice, setOpenInvoice] = useState(false)
    const [bitcoinCheckoutUrl, setBitcoinCheckoutUrl] = useState()
    const [isBitcoinInvoiceExpired, setIsBitcoinInvoiceExpired] = useState(false)
    const [clientCurrency, setClientCurrency] = useState();

    useEffect(() => {
        if (!loading) {
            setDateIncurred(formattedDateIncurred)
            setDatePaid(formattedDatePaid)
            setPaymentAmount(Number(getPaymentById.amount) / 100)
            setBitcoinCheckoutUrl(getPaymentById.bitcoinCheckoutUrl)
            setIsBitcoinInvoiceExpired(getPaymentById.isBitcoinInvoiceExpired)
            setClientCurrency(getClientById.currency)
        } 
    }, [loading])

    const [generateBitcoinInvoice, { 
        dataInvoice, 
        loadingInvoice, 
        errorInvoice }] = useMutation(CREATE_BITCOIN_INVOICE, 
        {
            refetchQueries: [{
                query: GET_PAYMENT_DETAILS,
                variables: {
                    clientId: Number(clientId),
                    paymentId: Number(paymentId) 
                },
                awaitReftechQueries: true
            }]
        })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${errorPayment}`

    const { getPaymentById, getClientById } = data
    const formattedDatePaid = getPaymentById.date_paid && moment.utc(parseInt(getPaymentById.date_paid, 10)).format('YYYY-MM-DD')
    const formattedDateIncurred = moment.utc(parseInt(getPaymentById.date_incurred, 10)).format('YYYY-MM-DD')

    const handleDisplayAlert = (message, severity) => {
        setAlertMessage(message)
        setAlertSeverity(severity)
        setDisplayAlert(true)
    }
    
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayAlert(false)
    }

    const handleEditPayment = async () => {
        const variables = {
            id: Number(paymentId),
            amount: Number(paymentAmount) * 100,
            client_id: Number(clientId),
            date_incurred: dateIncurred,
            date_paid: datePaid
        }
        handleDisplayAlert('Updating Payment...', 'warning')
        
        try {
            await editPayment({ variables })
            handleDisplayAlert('Payment Updated Successfully', 'success')
        } catch {
            handleDisplayAlert('Error Updating Payment', 'error')
        }
    }

    const handleDateIncurredChange = (date) => {
        if (date) {
            setDateIncurred(moment(date['_d']).format('YYYY-MM-DD'))
        } else {
            setDateIncurred(null)
        }
    }

    const handleDatePaidChange = (date) => {
        if (date) {
            setDatePaid(moment(date['_d']).format('YYYY-MM-DD'))
        } else {
            setDatePaid(null)
        }
    }

    const handleBitcoinInvoiceGeneration = async () => {
        handleDisplayAlert('Generating Invoice...', 'warning')

        try {
            const bitcoinInvoice = await generateBitcoinInvoice({ 
                variables: { 
                    paymentId: Number(paymentId) 
                } 
            })
            if (!loadingInvoice && !errorInvoice) {
                setBitcoinCheckoutUrl(bitcoinInvoice.data.generateBitcoinInvoiceFromPayment.bitcoinCheckoutUrl);
                setIsBitcoinInvoiceExpired(false)
                setOpenInvoice(true)
            }
        } catch (error) {
            handleDisplayAlert(error, 'error')
        }
    }

    const handleViewBitcoinInvoice = () => {
        if (!isBitcoinInvoiceExpired) setOpenInvoice(true)
        else {
            handleDisplayAlert('Bitcoin Invoice has expired', 'error')
        }
    }

    const handleCloseInvoice = () => {
        setOpenInvoice(false);
    }

    const cancelEditPayment = () => {
        history.push(`/clients/${clientId}`)
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
                                onChange={(event, value) => setPaymentAmount(value)}
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
                <Grid item container xs={12} spacing={2}>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleEditPayment}
                        >
                            {`Update Payment`}
                        </Button>
                    </Grid>
                </Grid>

                {(clientCurrency === 'BTC' || clientCurrency === 'SATS') && 
                <Grid item container xs={12} spacing={1}>
                    <Grid item>
                        <Button 
                            variant='contained'
                            color='secondary'
                            onClick={handleBitcoinInvoiceGeneration}
                        >
                            {`Generate Bitcoin Invoice`}
                        </Button>
                    </Grid>
                    <Grid item>
                        {
                            bitcoinCheckoutUrl &&
                            <Button 
                                variant='contained'
                                color='secondary'
                                onClick={handleViewBitcoinInvoice}
                            >
                                {`View Bitcoin Invoice`}
                            </Button>
                        }
                    </Grid>
                </Grid>}
                
                <Grid item>
                    <Button 
                        variant='contained'
                        color='inherit'
                        onClick={cancelEditPayment}
                    >
                        {`Done`}
                    </Button>
                </Grid>
                <BtcInvoiceModal 
                    open={openInvoice} 
                    onClose={handleCloseInvoice} 
                    bitcoinCheckoutUrl={bitcoinCheckoutUrl}
                />
            </Grid>
            <Snackbar
                open={displayAlert}
                autoHideDuration={4000}
                onClose={handleAlertClose}
            >
                <Alert severity={alertSeverity}>
                    {`${alertMessage}`}
                </Alert>
            </Snackbar>
        </FormControl>
    )
}

export default EditPaymentForm
