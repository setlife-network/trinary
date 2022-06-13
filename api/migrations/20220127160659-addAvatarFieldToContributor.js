module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Contributors', 'avatar_url', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Contributors', 'avatar_url', {
                    type: Sequelize.DataTypes.STRING
                }, { transaction: t })
            ])
        })
    }
}