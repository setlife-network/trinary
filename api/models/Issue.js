const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const { Project } = require('.')

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
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        project_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                //deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
                key: 'id',
            }
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Issue'
    });
    // Issue.associate = (models) => {
    //     Issue.hasOne(Sequelize.models.Project);
    // };

    return Issue

}
