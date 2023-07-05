module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Payments', 'currency', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t }),
                queryInterface.addColumn('Payments', 'contributor_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Contributors',
                        id: 'key'
                    }
                }, { transaction: t })
            ])
        })
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Payments', 'currency', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t }),
                queryInterface.removeColumn('Payments', 'contributor_id', 
                    { transaction: t })
            ])
        })
    }
};
