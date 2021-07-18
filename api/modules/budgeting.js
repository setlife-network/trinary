const moment = require('moment')

const budgeting = module.exports = (() => {
    const db = require('../models')
    const clientManagement = require('./clientManagement')

    const createPayment = async ({ paymentInformation }) => {
        const client = await clientManagement.findClientWithExternalId({
            id: paymentInformation.customer_id
        })

        const {
            amount,
            external_uuid,
            date_incurred,
            date_paid,
            external_uuid_type
        } = paymentInformation

        if (client) {
            return db.models.Payment.create({
                amount,
                external_uuid,
                date_incurred: date_incurred.format('YYYY-MM-DD HH:mm:ss'),
                date_paid: date_paid ? moment(date_paid['_d']) : null,
                client_id: client.id,
                external_uuid_type
            })
        }
    }

    const deletePaymentByStripeInvoiceId = (params) => {
        let deletedPayment
        try {
            deletedPayment = db.models.Payment.destroy({
                where: {
                    external_uuid: params.invoiceId
                }
            })
        } catch {
            throw 'Failed deleting from database'
        }
        return deletedPayment
    }

    const getPaymentWithExternalId = (params) => {
        return db.models.Payment.findOne({
            where: {
                external_uuid: params.id
            },
            raw: true,
        })
    }

    const getPaymentWithId = (params) => {
        return db.models.Payment.findByPk(params.id, {
            raw: true
        })
    }

    const updateDatePaidPayment = async ({ stripeInvoice }) => {
        const existingPayment = await getPaymentWithExternalId({ id: stripeInvoice.id })

        if (existingPayment && existingPayment.date_paid == null) {
            const datePaid = moment(stripeInvoice.webhooks_delivered_at)

            await db.models.Payment.update({
                date_paid: datePaid.format('YYYY-MM-DD')
            }, {
                where: {
                    id: existingPayment.id
                }
            })
        }
    }

    const updatePaymentByStripeInvoiceId = async ({ stripeInvoice }) => {
        const datePaidOverride = stripeInvoice.metadata.date_paid || null
        const dateIncurredOverride = stripeInvoice.metadata.date_incurred || null
        
        const paymentInformation = {
            amount: stripeInvoice.total,
            external_uuid: stripeInvoice.id,
            date_incurred: dateIncurredOverride || stripeInvoice.created,
            date_paid: datePaidOverride,
            customer_id: stripeInvoice.customer,
            external_uuid_type: 'STRIPE',
        }
        const paymentToUpdate = await db.models.Payment.findOne({
            where: {
                external_uuid: paymentInformation.external_uuid,
                external_uuid_type: paymentInformation.external_uuid_type
            }
        })
        if (paymentToUpdate) {
            if (datePaidOverride || dateIncurredOverride) {
                updateDatePaidPayment({ paymentInformation: paymentInformation })
            }
        } else {
            //the payment is not in the db, proceed to store it
            createPayment({ paymentInformation: paymentInformation })
        }
    }
    
    return {
        createPayment,
        deletePaymentByStripeInvoiceId,
        getPaymentWithId,
        getPaymentWithExternalId,
        updateDatePaidPayment,
        updatePaymentByStripeInvoiceId,
    }
})()
