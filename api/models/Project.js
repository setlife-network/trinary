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
        expected_budget_timeframe: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        is_public: {
            type: DataTypes.INTEGER
        },
        date_last_synced: {
            type: DataTypes.DATE,
        },
        client_id: { //FK
            type: DataTypes.INTEGER(11),
            references: {
                model: 'Clients',
                key: 'id'
            }
        },
        expected_budget_currency: {
            type: DataTypes.STRING,
            allowNull: false
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
