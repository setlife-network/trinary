const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    class Contributor extends Sequelize.Model {}

    Contributor.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        hourly_rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weekly_rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monthly_rate: {
            type: DataTypes.INTEGER,
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
        modelName: 'Contributor'
    });

    return Contributor

}
