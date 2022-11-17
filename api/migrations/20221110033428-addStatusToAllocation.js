const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Allocations', 'status', {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Allocations', 'status',
                    { transaction: t })
            ])
        })
    }
};
