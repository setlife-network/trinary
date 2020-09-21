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

sequelize
    .authenticate()
    .then(async function(err) {
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();
    })
    // .then(() => {
    //     console.log('adding FK');
    //     db.sequelize.models.Project.hasOne(db.sequelize.models.Client);
    // })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

const db = {
    sequelize,
    models: {
        Allocation: require('./Allocation')(sequelize),
        Client: require('./Client')(sequelize),
        Contributor: require('./Contributor')(sequelize),
        Issue: require('./Issue')(sequelize),
        Payment: require('./Payment')(sequelize),
        Project: require('./Project')(sequelize),
        TimeEntry: require('./TimeEntry')(sequelize),

    }
};

module.exports = db;
