const db = require('../../models')

module.exports = (fieldName, id) => {
    return {
        getAllocationById: (id) => db.models.Allocation.findByPk(id).dataValues.project_id,
        updateAllocationById: (id) => db.models.Allocation.findByPk(id).dataValues.project_id,
        deleteAllocationById: (id) => db.models.Allocation.findByPk(id).dataValues.project_id,
        getClientById: (id) => db.models.Client.findByPk(id).dataValues.project_id,
        updateClientById: (id) => db.models.Client.findByPk(id).dataValues.project_id,
        deleteClientById: (id) => db.models.Client.findByPk(id).dataValues.project_id,
        getPaymentById: (id) => db.models.Payment.findByPk(id).dataValues.project_id,
        updatePaymentById: (id) => db.models.Payment.findByPk(id).dataValues.project_id,
        deletePaymentById: (id) => db.models.Payment.findByPk(id).dataValues.project_id,
    }
}
