const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    class Payment extends Sequelize.Model {}

    Payment.init({
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_incurred: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_paid: {
            type: DataTypes.DATE,
            allowNull: false
        },
        client_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: 'id',
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Payment'
    });

    return Payment

}
