const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const { Contributor, Payment, Project } = require('./')

module.exports = (sequelize) => {

    class Allocation extends Sequelize.Model {}

    Allocation.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rate_type: { //?
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_paid: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        payment_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Payments',
                key: 'id',
            }
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'id',
            }
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Contributors',
                key: 'id',
            }
        }
    },

    {
        // Model options go here
        sequelize,
        modelName: 'Allocation'
    });

    return Allocation

}
