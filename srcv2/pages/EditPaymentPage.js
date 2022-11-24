import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import BtcInvoiceModal from '../components/BtcInvoiceModal'
import Section from '../components/Section'

import { GET_PAYMENT_DETAILS } from '../operations/queries/PaymentQueries'
import { CREATE_BITCOIN_INVOICE, UPDATE_PAYMENT } from '../operations/mutations/PaymentMutations'

import { selectCurrencyInformation } from '../scripts/selectors'

const EditPaymentPage = (props) => {

    const { paymentId } = useParams()
    const history = useHistory()

    const [paymentAmount, setPaymentAmount] = useState()
    const [paymentCurrency, setPaymentCurrency] = useState()
    const [dateIncurred, setDateIncurred] = useState()
    const [datePaid, setDatePaid] = useState()
    const [bitcoinCheckoutUrl, setBitcoinCheckoutUrl] = useState()
    const [isBitcoinInvoiceExpired, setIsBitcoinInvoiceExpired] = useState(false)
    const [openInvoice, setOpenInvoice] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const {
        loading: paymentDetailsLoading, 
        error: paymentDetailsError, 
        data: paymentDetailsData
    } = useQuery(GET_PAYMENT_DETAILS, { 
        variables: {
            paymentId: Number(paymentId) 
        },
        onCompleted: paymentData => {
            const { getPaymentById: payment } = paymentData
            setPaymentAmount(payment.amount)
            setPaymentCurrency(payment.currency)
            setDateIncurred(moment(payment.date_incurred, 'x').format('YYYY-MM-DD'))
            setDatePaid(moment(payment.date_paid, 'x').format('YYYY-MM-DD'))
        }
    })

    const [updatePayment, {
        dataPayment,
        loading: loadingPayment,
        errorPayment
    }] = useMutation(UPDATE_PAYMENT)

    const [generateBitcoinInvoice, { 
        dataInvoice, 
        loading: loadingInvoice, 
        errorInvoice
    }] = useMutation(CREATE_BITCOIN_INVOICE, {
        refetchQueries: [{
            query: GET_PAYMENT_DETAILS,
            variables: {
                paymentId: Number(paymentId) 
            },
            awaitReftechQueries: true
        }]
    })

    if (paymentDetailsLoading) return 'Loading...'
    if (paymentDetailsError) return `${paymentDetailsError}`

    const { getPaymentById: payment } = paymentDetailsData

    const currencyInformation = payment.currency
        ? selectCurrencyInformation({
            currency: payment.currency
        }) 
        : null

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

    const handlePaymentUpdate = async () => {
        const variables = {
            id: Number(paymentId),
            amount: Number(paymentAmount),
            date_incurred: dateIncurred,
            date_paid: datePaid != 'Invalid date' ? datePaid : null
        }
        try {
            await updatePayment({ variables })
            // history.push(`/projects/${payment.project_id}`)
        } catch (error) {
            setErrorMessage('Error Updating Payment: ' + error)
            console.log('Error Updating Payment ' + error)
        }
    }

    const handleBitcoinInvoiceGeneration = async () => {
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
            setErrorMessage('An error ocurred ' + error)
            console.log('An error ocurred ' + error)
        }
    }

    const handleViewBitcoinInvoice = () => {
        if (!isBitcoinInvoiceExpired) setOpenInvoice(true)
        else {
            console.log('Bitcoin Invoice has expired')
        }
    }

    return (
        <div className='EditPaymentPage'>
            <Section>
                <div className='grid gap-4'>
                    <p className='text-xl font-bold mb-4'>Edit payment</p>
                    <p className=''>Edit the details of the payment below</p>
                    <CurrencyTextField
                        fullWidth
                        label='Payment amount'
                        variant='outlined'
                        currencySymbol={`${currencyInformation['symbol']}`}
                        minimumValue='0'
                        outputFormat='string'
                        decimalCharacter={`${currencyInformation['decimal']}`}
                        digitGroupSeparator={`${currencyInformation['thousand']}`}
                        value={payment.amount}
                        onChange={(event, value) => setPaymentAmount(value)}
                    />
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
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            disableToolbar
                            variant='inline'
                            format='MM/DD/YYYY'
                            margin='normal'
                            label='Payment date paid'
                            value={datePaid ? datePaid : null}
                            onChange={handleDatePaidChange}
                        />
                    </MuiPickersUtilsProvider>
                    <button
                        type='button'
                        onClick={() => handlePaymentUpdate()}
                        className={`${loadingPayment ? 'bg-light' : 'bg-setlife'} rounded-lg text-white px-4 py-2`}
                        disabled={loadingPayment}
                    >
                        Update
                    </button>
                    {(payment.currency === 'BTC' || payment.currency === 'SATS') && 
                        <button 
                            type='button'
                            className={`${loadingInvoice ? 'bg-light' : 'bg-setlife '} rounded-lg text-white px-4 py-2`}
                            onClick={() => handleBitcoinInvoiceGeneration()}
                        >
                            {`Generate Bitcoin Invoice`}
                        </button>
                    }
                    {bitcoinCheckoutUrl &&
                        <button 
                            type='button'
                            className='bg-setlife rounded-lg text-white px-4 py-2'
                            onClick={() => handleViewBitcoinInvoice()}
                        >
                            {`View Bitcoin Invoice`}
                        </button>
                    }
                    <button 
                        type='button'
                        className='rounded-lg px-4 py-2 fixed bottom-10 right-10 left-10'
                        onClick={() => history.push(`/projects/${payment.project_id}`)}
                    >
                        {`Cancel`}
                    </button>
                </div>
                <p className='text-red-500 fixed bottom-20 text-center right-20 left-20'>
                    {errorMessage}
                </p>
            </Section>
            <BtcInvoiceModal 
                open={openInvoice} 
                onClose={() => setOpenInvoice(false)} 
                bitcoinCheckoutUrl={bitcoinCheckoutUrl}
            />
        </div>
    )
}

export default EditPaymentPage