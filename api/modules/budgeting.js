const db = require('../models');

const budgeting = module.exports = (() => {

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
    
    return {
        deletePaymentByStripeInvoiceId
    }
})()