const Sequelize = require('sequelize')
const { DataTypes, Deferrable } = require('sequelize')

module.exports = (sequelize) => {

    class Client extends Sequelize.Model {}

    Client.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Client'
    });

    return Client

}
