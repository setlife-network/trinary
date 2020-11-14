const Sequelize = require('sequelize')
const { DataTypes, Deferrable } = require('sequelize')

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
        toggl_id: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        github_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        toggl_url: {
            type: DataTypes.STRING,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_last_synced: {
            type: DataTypes.DATE,
        },
        client_id: { //FK
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Clients',
                key: 'id'
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Project',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Project

}
