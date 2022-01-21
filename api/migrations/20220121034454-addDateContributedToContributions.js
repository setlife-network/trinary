module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Contributions', 'date_contributed', {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Clients', 'date_contributed',
                    { transaction: t })
            ])
        })
    }
};
