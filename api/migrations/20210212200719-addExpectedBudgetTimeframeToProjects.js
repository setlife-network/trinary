module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Projects', 'expected_budget_timeframe', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Projects', 'expected_budget_timeframe', { transaction: t })
            ])
        })
    }
};
