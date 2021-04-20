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
        email: {
            type: DataTypes.STRING
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        external_uuid: {
            type: DataTypes.STRING
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Client',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Client

}
