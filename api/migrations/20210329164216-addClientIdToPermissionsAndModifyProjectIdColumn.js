module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Permissions', 'client_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    references: {
                        model: 'Clients',
                        key: 'id'
                    }
                }, { transaction: t }),
                queryInterface.changeColumn('Permissions', 'project_id', {
                    allowNull: true
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Permissions', 'client_id', { transaction: t }),
                queryInterface.changeColumn('resources', 'resourceId', {
                    allowNull: false
                }, { transaction: t })
            ])
        })
    }
};
