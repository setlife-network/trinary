const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const { Contributor, Payment, Project } = require('.')

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
        //TODO: Change this when rates table added
        rate_unit: {
            type: DataTypes.INTEGER
        },
        rate_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        date_paid: {
            type: Sequelize.DATE
        },
        payment_id: { //FK
            type: DataTypes.INTEGER,
            references: {
                model: 'Payments',
                key: 'id',
            }
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false, //TODO: Think if this is necesary to be set to false
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
        modelName: 'Allocation',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Allocation

}
