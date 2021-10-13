const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    
    class Contributions extends Sequelize.Model {}

    Contributions.init({
        // Model attributes are defined here
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