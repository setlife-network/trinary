const db = require('../models')
const { DEFAULT_STRIPE_CURRENCY } = require('../config/constants')
const { createBitcoinInvoice, getInvoiceById } = require('../handlers/btcPayServer')

const paymentManagement = module.exports = (() => {

    const checkIfBitcoinInvoiceHasExpired = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        if (invoice.status === 'Expired') return true
        return false
    }
    
    const getBitcoinCheckoutUrl = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        return invoice.checkoutLink
    }

    const getBitcoinInvoiceAmount = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        return Number(invoice.amount)
    }

    const processBitcoinInvoiceCreation = async (paymentId) => {
        const payment = await db.models.Payment.findByPk(paymentId)
        const { amount, client_id, date_paid, external_uuid, external_uuid_type } = payment.dataValues

        const client = await db.models.Client.findByPk(client_id)
        const isClientCurrencyBtc = client.dataValues.currency === `BTC` || client.dataValues.currency === `SATS`

        if (!isClientCurrencyBtc) throw new Error(`Client's currency is not Bitcoin`)

        const isInvoiceExpired = (
            external_uuid && external_uuid_type === `bitcoin` &&
            await checkIfBitcoinInvoiceHasExpired(external_uuid)
        )
        
        const convertedAmount = Number(amount / 100)

        const amountInSats = client.dataValues.currency === `BTC` ? 
            Number((convertedAmount * 100000000).toFixed(0)) // 100M sats = 1 BTC
            : convertedAmount
        
        const isAmountUpdated = amountInSats != await getBitcoinInvoiceAmount(external_uuid)
        
        if (external_uuid && date_paid && !isInvoiceExpired && !isAmountUpdated) throw new Error(`An active invoice already exists`)
            
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
        getBitcoinCheckoutUrl,
        processStripeInvoiceWithPayment,
        processBitcoinInvoiceCreation
    }
})()
