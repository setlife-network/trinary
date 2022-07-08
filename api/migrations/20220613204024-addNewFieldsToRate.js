const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Rates', 'minimum_expected_hours', {
                    type: Sequelize.DataTypes.INTEGER(11),
                    allowNull: true,
                    defaultValue: null
                }, { transaction: t }),
                queryInterface.addColumn('Rates', 'maximum_expected_hours', {
                    type: Sequelize.DataTypes.INTEGER(11),
                    allowNull: true,
                    defaultValue: null
                }, { transaction: t }),
                queryInterface.addColumn('Rates', 'minimum_hourly_rate', {
                    type: Sequelize.DataTypes.STRING(15),
                    allowNull: true,
                    defaultValue: null
                }, { transaction: t }),
                queryInterface.addColumn('Rates', 'maximum_hourly_rate', {
                    type: Sequelize.DataTypes.STRING(15),
                    allowNull: true,
                    defaultValue: null
                }, { transaction: t }),
                queryInterface.addColumn('Rates', 'role_id', {
                    type: Sequelize.DataTypes.INTEGER(11),
                    allowNull: true,
                    defaultValue: null,
                    references: {
                        model: 'Roles',
                        key: 'id'
                    }
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Rates', 'minimum_expected_hours',
                    { transaction: t }),
                queryInterface.removeColumn('Rates', 'maximum_expected_hours',
                    { transaction: t }),
                queryInterface.removeColumn('Rates', 'minimum_hourly_rate',
                    { transaction: t }),
                queryInterface.removeColumn('Rates', 'maximum_hourly_rate',
                    { transaction: t }),
                queryInterface.removeColumn('Rates', 'role_id',
                    { transaction: t }),
            ])
        })
    }
};
