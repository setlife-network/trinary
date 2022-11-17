const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Projects', 'expected_budget_currency', {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Projects', 'expected_budget_currency',
                    { transaction: t })
            ])
        })
    }
};
