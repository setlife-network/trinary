module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Contributions', 'contributor_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Contributors',
                        key: 'id'
                    }
                }, { transaction: t }),
                queryInterface.addColumn('Contributions', 'issue_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Issues',
                        key: 'id'
                    }
                }, { transaction: t }),
                queryInterface.addColumn('Contributions', 'is_author', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                }, { transaction: t }),
                queryInterface.addColumn('Contributions', 'is_assigned', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Contributions', 'contributor_id', { transaction: t }),
                queryInterface.removeColumn('Contributions', 'issue_id', { transaction: t }),
                queryInterface.removeColumn('Contributions', 'is_author', { transaction: t }),
                queryInterface.removeColumn('Contributions', 'is_assigned', { transaction: t }),
            ])
        })
    }
};
