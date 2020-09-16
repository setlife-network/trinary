const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const { Contributor } = require('./')
const { Project } = require('./')

module.exports = (sequelize) => {

    class TimeEntry extends Sequelize.Model {}

    TimeEntry.init({
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        seconds: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toggl_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Contributor,
                key: 'id',
            }
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Project,
                key: 'id',
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'TimeEntry'
    });

    return TimeEntry

}
