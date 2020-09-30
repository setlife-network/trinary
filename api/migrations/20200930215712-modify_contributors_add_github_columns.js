module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Contributor',
                'github_url',
                {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            ),
            queryInterface.addColumn(
                'Contributor',
                'github_id',
                {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            ),
            queryInterface.addColumn(
                'Contributor',
                'github_handle',
                {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            )
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Contributor', 'github_url'),
            queryInterface.removeColumn('Contributor', 'github_id'),
            queryInterface.removeColumn('Contributor', 'github_handle'),
        ]);
    }
};
