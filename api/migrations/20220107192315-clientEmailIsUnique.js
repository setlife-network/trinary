module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addConstraint('Clients', {
                    fields: ['email'],
                    type: 'unique',
                    name: 'unique_client_email'
                })
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Clients', 'email', { transaction: t })
            ])
        })
    }
};
