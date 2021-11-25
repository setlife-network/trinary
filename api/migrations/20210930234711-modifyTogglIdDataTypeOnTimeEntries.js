module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('TimeEntries', 'toggl_id', {
                    type: Sequelize.DataTypes.BIGINT
                }, { transaction: t })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('TimeEntries', 'toggl_id', { transaction: t })
            ])
        })
    }
};
