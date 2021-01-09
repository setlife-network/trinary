const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    class Issue extends Sequelize.Model {}

    Issue.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        github_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        github_number: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        date_opened: {
            type: DataTypes.DATE,
        },
        date_closed: {
            type: DataTypes.DATE,
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
        modelName: 'Issue',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Issue

}
