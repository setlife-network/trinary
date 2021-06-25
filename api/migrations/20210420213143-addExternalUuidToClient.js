module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Clients', 'external_uuid', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Clients', 'external_uuid', { transaction: t })
      ])
    })
  }
};