const db = require('../../models')

module.exports = async (fieldName, fieldId, operation) => {
    if (fieldName == 'getProjectById') {
        return fieldId
    }
    if (fieldName == 'getAllocationById' || fieldName == 'updateAllocationById' || fieldName == 'deleteAllocationByI') {
        console.log(await db.models.Allocation.findByPk(fieldId).dataValues.project_id)
        return db.models.Allocation.findByPk(fieldId).dataValues.project_id
    }
    if (fieldName == 'getClientById' || fieldName == 'updateClientById' || fieldName == 'deleteClientByI') {
        return db.models.Client.findByPk(fieldId).dataValues.project_id
    }
    if (fieldName == 'getPaymentById' || fieldName == 'updatePaymentById' || fieldName == 'deletePaymentById') {
        return db.models.Payment.findByPk(fieldId).dataValues.project_id
    }
}
