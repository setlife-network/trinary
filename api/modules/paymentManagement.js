const db = require('../models')
const { DEFAULT_STRIPE_CURRENCY } = require('../config/constants')
const { createBitcoinInvoice, getInvoiceById } = require('../handlers/btcPayServer')

const paymentManagement = module.exports = (() => {

    const isBitcoinInvoiceExpired = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        if (invoice.status === 'Expired') return true
        return false
    }
    
    const getBitcoinCheckoutUrl = async (invoiceId) => {
        const invoice = await getInvoiceById(invoiceId)
        return invoice.checkoutLink
    }

    const processBitcoinInvoiceCreation = async (paymentId) => {
        const payment = await db.models.Payment.findByPk(paymentId)
        const { amount, client_id, date_paid, external_uuid, external_uuid_type } = payment.dataValues

        const client = await db.models.Client.findByPk(client_id)
        const isClientCurrencyBtc = client.dataValues.currency === `BTC` || client.dataValues.currency === `SATS`

        if (!isClientCurrencyBtc) throw new Error(`Client's currency is not Bitcoin`)

        const isInvoiceExpired = external_uuid && external_uuid_type === `bitcoin` && await isBitcoinInvoiceExpired(external_uuid)
        if (external_uuid && date_paid && !isInvoiceExpired) throw new Error(`An active invoice already exists`)

        const convertedAmount = Number((amount / 100).toFixed(0))

        const amountInSats = client.dataValues.currency === `BTC` ? 
            Number((convertedAmount * 100000000).toFixed(0)) // 100M sats = 1 BTC
            : convertedAmount
            
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
        getBitcoinCheckoutUrl,
        isBitcoinInvoiceExpired,
        processStripeInvoiceWithPayment,
        processBitcoinInvoiceCreation
    }
})()
