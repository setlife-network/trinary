const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    class Contributor extends Sequelize.Model {}

    Contributor.init({
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
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
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Contributor'
    });

    return Contributor

}
