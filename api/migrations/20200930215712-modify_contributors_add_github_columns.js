module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Contributors',
                'github_url',
                {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            ),
            queryInterface.addColumn(
                'Contributors',
                'github_id',
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                }
            ),
            queryInterface.addColumn(
                'Contributors',
                'github_handle',
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
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
