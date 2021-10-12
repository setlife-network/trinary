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