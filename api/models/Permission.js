const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    class Permission extends Sequelize.Model {}

    Permission.init({
        type: {
            type: DataTypes.STRING
        },
        contributor_id: { //FK
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Contributors',
                key: 'id',
            }
        },
        project_id: {
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
        modelName: 'Permission',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Permission

}
