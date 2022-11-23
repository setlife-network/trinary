const db = require('../models')
const { DEFAULT_STRIPE_CURRENCY } = require('../config/constants')
const { createBitcoinInvoice, getInvoiceById } = require('../handlers/btcPayServer')

const paymentManagement = module.exports = (() => {

    const checkIfBitcoinInvoiceHasExpired = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        if (invoice.status === 'Expired') return true
        return false
    }

    const checkIfBitcoinInvoiceIsPaid = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        if (invoice.status === 'Settled') return true
        return false
    }
    
    const getBitcoinCheckoutUrl = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        return invoice.checkoutLink
    }

    const processBitcoinInvoiceCreation = async (paymentId) => {
        let paymentCurrency
        let isClientCurrencyBtc = false
        
        const payment = await db.models.Payment.findByPk(paymentId)
        const { 
            amount, 
            client_id, 
            currency,
            date_paid, 
            external_uuid, 
            external_uuid_type 
        } = payment.dataValues

        if (date_paid) throw new Error(`Payment has already been made`)

        if (client_id) {
            const client = await db.models.Client.findByPk(client_id)
            paymentCurrency = client.dataValues.currency
            isClientCurrencyBtc = 
            paymentCurrency === `BTC` ||
            paymentCurrency === `SATS`
        }

        if (currency) {
            isClientCurrencyBtc = currency === `BTC` || currency === `SATS`
            paymentCurrency = currency
        }

        if (!isClientCurrencyBtc) {
            throw new Error(`Client's currency is not Bitcoin`)
        }
        
        const convertedAmount = Number(amount / 100)

        const amountInSats = paymentCurrency === `BTC` 
            ? Number((convertedAmount * 100000000).toFixed(0)) // 100M sats = 1 BTC
            : convertedAmount

        if (external_uuid && external_uuid_type === `bitcoin`) {
            
            const invoice = await getInvoiceById(external_uuid)
            const isInvoiceExpired = invoice.status === `Expired`
            const isAmountUpdated = amountInSats != Number(invoice.amount)
            
            if (!isInvoiceExpired && !isAmountUpdated) {
                throw new Error(`An active invoice already exists`)
            }
        }
            
        return createBitcoinInvoice(amountInSats)
    }

    const processStripeInvoiceWithPayment = async (params) => {
        const stripe = require('../handlers/stripe')
        const {
            amount,
            clientId,
            currency,
            date_paid
        } = params
        
        const actualCurrency = 
            currency == DEFAULT_STRIPE_CURRENCY
                ? currency
                : DEFAULT_STRIPE_CURRENCY

        const createdInvoice = await stripe.createInvoice({
            clientId,
            amount,
            actualCurrency
        })

        if (date_paid) {
            return stripe.finalizeInvoice({ invoice: createdInvoice })
        }

        return createdInvoice
    }

    return {
        checkIfBitcoinInvoiceHasExpired,
        checkIfBitcoinInvoiceIsPaid,
        getBitcoinCheckoutUrl,
        processStripeInvoiceWithPayment,
        processBitcoinInvoiceCreation
    }
})()
