const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    class Allocations extends Sequelize.Model {}

    Allocations.init({
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: Squelize.INTEGER,
            allowNull: false,
        },
        date_created: {
            type: Squelize.DATE,
            allowNull: false,
        },
        date_paid: {
            type: Squelize.DATE,
            allowNull: false,
        },
        rate_type: { //?
            type: Squelize.INTEGER,
            allowNull: false,
        },
        active: {
            type: Squelize.BOOLEAN,
            allowNull: false,
        },
        payment_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Payment,
                key: 'id',
            }
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Project,
                key: 'id',
            }
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Contributor,
                key: 'id',
            }
        },
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Allocations'
    });

    return Allocations

}
