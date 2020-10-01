const Sequelize = require('sequelize')

const { DataTypes } = Sequelize

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
            allowNull: false,
            unique: true
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Contributors',
                key: 'id',
            }
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
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
