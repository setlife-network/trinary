const { MYSQL } = require('./credentials');

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = MYSQL

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    },
    staging: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql'
    }
}
