const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Payments', 'project_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Projects',
                        key: 'id'
                    }
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Payments', 'project_id',
                    { transaction: t }),
            ])
        })
    }
};
