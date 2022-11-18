const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Allocations', 'proposed_by_contributor_id', {
                    type: Sequelize.DataTypes.INTEGER(11),
                    allowNull: true,
                    references: {
                        model: 'Contributors',
                        key: 'id'
                    }
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Allocations', 'proposed_by_contributor_id',
                    { transaction: t })
            ])
        })
    }
};
