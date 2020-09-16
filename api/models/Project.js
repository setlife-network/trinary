const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const { Client } = require('./')

module.exports = (sequelize) => {

    class Project extends Sequelize.Model {}

    Project.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        expected_budget: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        github_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
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
        modelName: 'Project'
    });

    return Project

}
