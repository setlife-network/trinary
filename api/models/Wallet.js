const Sequelize = require('sequelize');

const { DataTypes } = Sequelize

module.exports = (sequelize) => {
    
    class Wallet extends Sequelize.Model {}

    Wallet.init({

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
            allowNull: true,
            references: {
                model: 'Projects',
                key: 'id',
            }
        },
        onchain_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoice_macaroon: {
            type: DataTypes.STRING(600),
            allowNull: true
        },
        lnd_host: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lnd_port: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        btcps_api_key: {
            type: DataTypes.STRING,
            allowNull: true
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        balance_last_updated: {
            type: DataTypes.DATE,
            allowNull: true
        },
        alby_oauth_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voltage_node_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voltage_api_key: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Wallet',
    });
    return Wallet;
};