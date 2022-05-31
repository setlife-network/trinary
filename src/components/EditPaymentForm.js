import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
    Button,
    FormControl,
    Grid,
    Modal,
    Snackbar,
    Box,
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
import { EDIT_PAYMENT, CREATE_BITCOIN_INVOICE } from '../operations/mutations/PaymentMutations'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const EditPaymentForm = (props) => {

    const history = useHistory()

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

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
    const [alertSeverity, setAlertSeverity] = useState();
    const [displayAlert, setDisplayAlert] = useState(false)
    const [dateIncurred, setDateIncurred] = useState('')
    const [datePaid, setDatePaid] = useState('')
    const [disableAdd, setDisableAdd] = useState(false)
    const [invalidPaymentAmountInput, setInvalidPaymentAmountInput] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)
    const [disableEdit, setDisableEdit] = useState(true)
    const [openInvoice, setOpenInvoice] = useState(false)
    const [bitcoinCheckoutUrl, setBitcoinCheckoutUrl] = useState()
    const [isBitcoinInvoiceExpired, setIsBitcoinInvoiceExpired] = useState(false)
    const [clientCurrency, setClientCurrency] = useState();

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
    const formattedDatePaid = moment.utc(parseInt(getPaymentById.date_paid, 10)).format('YYYY-MM-DD')
    const formattedDateIncurred = moment.utc(parseInt(getPaymentById.date_incurred, 10)).format('YYYY-MM-DD')

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

        setAlertMessage('Updating Payment...')
        setAlertSeverity('warning')
        setDisplayAlert(true)
        
        try {
            const updatePayment = await editPayment({ variables })

            setAlertMessage('Payment Updated Successfully')
            setAlertSeverity('success')
            setDisplayAlert(true)
        } catch {
            setDisableAdd(false)
            setAlertMessage('Error Updating Payment')
            setAlertSeverity('error')
            setDisplayAlert(true)
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

        setAlertMessage('Generating Invoice...')
        setAlertSeverity('warning')
        setDisplayAlert(true)

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
            setAlertMessage(error)
            setAlertSeverity('error')
            setDisplayAlert(true)
        }
    }

    const handleViewBitcoinInvoice = () => {
        if (!isBitcoinInvoiceExpired) setOpenInvoice(true)
        else {
            setAlertMessage('Bitcoin Invoice has expired')
            setAlertSeverity('error')
            setDisplayAlert(true)
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
                            disabled={disableAdd}
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
                <Modal
                    open={openInvoice}
                    onClose={handleCloseInvoice}
                >
                    <Box sx={modalStyle}>
                        <iframe title='invoice' height='660px' src={`${bitcoinCheckoutUrl}`}>
                        </iframe>
                    </Box>
                </Modal>
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
