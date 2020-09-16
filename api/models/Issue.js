const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    class Issue extends Sequelize.Model {}

    Payment.init({
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        github_url: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        modelName: 'Issue'
    });

    return Issue

}
