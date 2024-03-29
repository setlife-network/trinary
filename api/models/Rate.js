const Sequelize = require('sequelize')
const { DataTypes, Deferrable } = require('sequelize')

module.exports = (sequelize) => {

    class Rate extends Sequelize.Model {}

    Rate.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total_expected_hours: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hourly_rate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING
        },
        minimum_expected_hours: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null
        },
        maximum_expected_hours: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null
        },
        minimum_hourly_rate: {
            type: DataTypes.STRING(15),
            allowNull: true,
            defaultValue: null
        },
        maximum_hourly_rate: {
            type: DataTypes.STRING(15),
            allowNull: true,
            defaultValue: null
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER(11),
            references: {
                model: 'Contributors',
                key: 'id'
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Rate',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Rate

}
