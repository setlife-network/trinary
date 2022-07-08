const Sequelize = require('sequelize')
const { DataTypes, Deferrable } = require('sequelize')

module.exports = (sequelize) => {

    class Role extends Sequelize.Model {}

    Role.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Role',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Role

}
