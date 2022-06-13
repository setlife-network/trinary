const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Contributions', 'date_contributed', {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: moment().format('YYYY-MM-DD')
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Contributions', 'date_contributed',
                    { transaction: t })
            ])
        })
    }
};
