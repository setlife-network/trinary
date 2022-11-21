module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.addColumn('Projects', 'is_public', {
                  type: Sequelize.DataTypes.INTEGER
              }, { transaction: t })
          ])
      })
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.removeColumn('Projects', 'is_public', {
                  type: Sequelize.DataTypes.INTEGER
              }, { transaction: t })
          ])
      })
  }
}
