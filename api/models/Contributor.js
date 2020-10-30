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
            type: DataTypes.INTEGER
        },
        weekly_rate: {
            type: DataTypes.INTEGER
        },
        monthly_rate: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        external_data_url: {
            type: DataTypes.STRING
        },
        github_id: {
            type: DataTypes.STRING,
            unique: true
        },
        github_handle: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Contributor',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Contributor

}
