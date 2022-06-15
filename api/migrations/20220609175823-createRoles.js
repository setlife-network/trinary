module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('Role', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Contributions');
    }
};
