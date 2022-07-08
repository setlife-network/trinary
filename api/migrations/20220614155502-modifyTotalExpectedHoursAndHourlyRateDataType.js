module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('Rates', 'total_expected_hours', {
                    type: Sequelize.DataTypes.INTEGER(11)
                }, { transaction: t }),
                queryInterface.changeColumn('Rates', 'hourly_rate', {
                    type: Sequelize.DataTypes.STRING(15)
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('Rates', 'total_expected_hours', {
                    type: Sequelize.DataTypes.INTEGER
                }, { transaction: t }),
                queryInterface.changeColumn('Rates', 'hourly_rate', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t })
            ])
        })
    }
};
