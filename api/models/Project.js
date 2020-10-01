const Sequelize = require('sequelize')
const { DataTypes, Deferrable } = require('sequelize')

const Client = require('./Client')

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
            allowNull: false,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        client_id: { //FK
            type: DataTypes.INTEGER(11),
            references: {
                model: 'Clients',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
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
