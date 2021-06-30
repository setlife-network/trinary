const db = require('../models');

const budgeting = module.exports = (() => {

    const createPayment = async ({ paymentInformation }) => {
        const client = await getClientWithExternalId({ id: paymentInformation.customer_id })
        if (client) {
            return db.models.Payment.create({
                amount: paymentInformation.amount,
                external_uuid: paymentInformation.external_uuid,
                date_incurred: moment(paymentInformation.date_incurred['_d']).format('YYYY-MM-DD HH:mm:ss'),
                date_paid: paymentInformation.date_paid ? moment(paymentInformation.date_paid['_d']) : null,
                client_id: client.id,
                external_uuid_type: paymentInformation.external_uuid_type
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

    const updateDatePaidPayment = async ({ data }) => {
        const paymentInformation = {
            date_paid: data.webhooks_delivered_at,
            external_uuid: data.id
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

    const updatePaymentByStripeInvoiceId = async (params) => {
        const paymentToUpdate = await db.models.Payment.findOne({
            where: {
                external_uuid: params.paymentInformation.external_uuid,
                external_uuid_type: params.paymentInformation.external_uuid_type
            }
        })
        if (paymentToUpdate) {
            if (params.paymentInformation.date_paid) {
                updateDatePaidPayment({ paymentInformation: params.paymentInformation })
            }
        } else {
            //the payment is not in the db, proceed to store it
            createPayment({ paymentInformation: params.paymentInformation })
        }
    }
    
    return {
        createPayment,
        deletePaymentByStripeInvoiceId,
        updateDatePaidPayment,
        updatePaymentByStripeInvoiceId,
    }
})()