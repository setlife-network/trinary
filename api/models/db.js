const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const mysql2 = require('mysql2')
const { MYSQL } = require('../config/credentials');

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = MYSQL

const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: 3306,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

// sequelize
//     .authenticate()
//     .then(async function(err) {
//         console.log('Connection has been established successfully.');
//         // await sequelize.sync({ force: true });
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database:', err);
//     });

const {
    Allocation,
    Client,
    Contributor,
    Issue,
    Payment,
    Project,
    TimeEntry,
} = require('../models')

const db = {
    sequelize,
    models: {
        Allocation: Allocation(sequelize),
        Client: Client(sequelize),
        Contributor: Contributor(sequelize),
        Issue: Issue(sequelize),
        Payment: Payment(sequelize),
        Project: Project(sequelize),
        TimeEntry: TimeEntry(sequelize),
    }
};

module.exports = db;
