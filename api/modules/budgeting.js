const moment = require('moment')

const budgeting = module.exports = (() => {
    const db = require('../models')
    const clientManagement = require('./clientManagement')

    const checkExistentPaymentsWithExternalId = async (params) => {
        const existentPayments = await db.models.Payment.findAll({
            where: {
                external_uuid: params.id
            }
        })
        
        if (existentPayments) {
            for (const payment of existentPayments) {
                const client = await db.models.Client.findOne({
                    where: {
                        id: payment.client_id
                    }
                })

                if (client.currency != 'USD') {
                    try {
                        const deletedCustomer = await clientManagement.deleteClientUuid({ id: client.external_uuid })
                        console.log(`stripe customer disconnected ${deletedCustomer}`)
                    } catch (err) {
                        console.log(`An error ocurred: ${err}`)
                    }
                }
            }
        }
    }

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
            try {
                return db.models.Payment.create({
                    amount,
                    external_uuid,
                    date_incurred: date_incurred ? moment(date_incurred['_d']) : null,
                    date_paid: date_paid ? moment(date_paid['_d']) : null,
                    client_id: client.id,
                    external_uuid_type
                })
            } catch (err) {
                console.log(`an error ocurred: ${err}`)
            }
            
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
        const client = await clientManagement.findClientWithExternalId({
            id: stripeInvoice.customer
        })

        try {
            await checkExistentPaymentsWithExternalId({ id: stripeInvoice.id })

            client.currency = 'USD' //Stripe invoices will always have USD as currency
            await client.save()
        } catch (err) {
            console.log(`error while changing client currency: ${err}`)
        }

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
