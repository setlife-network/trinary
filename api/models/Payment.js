const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    class Payment extends Sequelize.Model {}

    Payment.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        external_uuid: {
            type: DataTypes.STRING,
            unique: true
        },
        external_uuid_type: {
            type: DataTypes.STRING
        },
        date_incurred: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_paid: {
            type: DataTypes.DATE
        },
        client_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Clients',
                key: 'id',
            }
        },
        contributor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Contributors',
                key: 'id'
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Projects',
                key: 'id'
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Payment',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Payment

}
