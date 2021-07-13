const db = require('../models')
const moment = require('moment')
const clientManagement = require('./clientManagement')

const budgeting = module.exports = (() => {

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

    const updateDatePaidPayment = async ({ paymentObjectPayload }) => {
        const paymentInformation = {
            date_paid: paymentObjectPayload.webhooks_delivered_at,
            external_uuid: paymentObjectPayload.id
        }
        const paymentToUpdate = {}
        if (paymentInformation.external_uuid) {
            Object.assign(paymentToUpdate, await getPaymentWithExternalId({ id: paymentInformation.external_uuid }))
        } else {
            Object.assign(paymentToUpdate, await getPaymentWithId({ id: paymentInformation.id }))
        }

        paymentToUpdate.date_paid = paymentInformation.date_paid
        await db.models.Payment.update({
            date_paid: moment(paymentToUpdate.date_paid, 'YYYY-MM-DD')
        }, {
            where: {
                id: paymentToUpdate.id
            }
        })
    }

    const updatePaymentByStripeInvoiceId = async ({ paymentObjectPayload }) => {
        const datePaidOverride = paymentObjectPayload.custom_fields[
            findIndex(
                paymentObjectPayload.custom_fields, 
                { name: 'date_paid' }
            )
        ]
        const paymentInformation = {
            amount: paymentObjectPayload.total,
            external_uuid: paymentObjectPayload.id,
            date_incurred: paymentObjectPayload.created,
            date_paid: datePaidOverride ? datePaidOverride.value : null,
            customer_id: paymentObjectPayload.customer,
            external_uuid_type: 'STRIPE',
        }
        const paymentToUpdate = await db.models.Payment.findOne({
            where: {
                external_uuid: paymentInformation.external_uuid,
                external_uuid_type: paymentInformation.external_uuid_type
            }
        })
        if (paymentToUpdate) {
            if (paymentInformation.date_paid) {
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
        updateDatePaidPayment,
        updatePaymentByStripeInvoiceId,
    }
})()
