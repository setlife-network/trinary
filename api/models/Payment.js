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
        external_uuid: {
            type: DataTypes.STRING,
            unique: true
        },
        date_incurred: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_paid: {
            type: DataTypes.DATE
        },
        external_uuid_type: {
            type: DataTypes.STRING
        },
        client_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Clients',
                key: 'id',
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
