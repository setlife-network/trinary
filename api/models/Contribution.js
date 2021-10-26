const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    
    class Contributions extends Sequelize.Model {}

    Contributions.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        contributor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Contributors',
                key: 'id'
            }
        },
        issue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Issues',
                key: 'id'
            }
        },
        is_author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_assigned: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_updated: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        // Model options go here
        sequelize,
        modelName: 'Contributions',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Contributions
    
}