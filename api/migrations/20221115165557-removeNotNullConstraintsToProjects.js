module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('Projects', 'expected_budget', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true
                }, { transaction: t }),
                queryInterface.changeColumn('Projects', 'client_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true
                }, { transaction: t }),
                queryInterface.changeColumn('Projects', 'date', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true
                }, { transaction: t })
            ])
        })
    },

    async down (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn('Projects', 'expected_budget', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            }, { transaction: t }),
            queryInterface.changeColumn('Projects', 'client_id', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            }, { transaction: t }),
            queryInterface.changeColumn('Projects', 'date', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            }, { transaction: t })
        ])
    }
};
