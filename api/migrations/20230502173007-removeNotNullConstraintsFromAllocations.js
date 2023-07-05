module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('Allocations', 'proposed_by_contributor_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true
                }, { transaction: t })
            ])
        })
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.changeColumn('Allocations', 'proposed_by_contributor_id', {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false
                }, { transaction: t })
            ])
        })
    }
}
