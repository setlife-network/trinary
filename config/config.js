var config = require('./config');

module.exports = {
  database: config.database.name,
  username: config.database.user,
  password: config.database.pass,
  dialect: 'postgres',
  dialectModulePath: 'pg.js',
  host: config.database.host,
  port: config.database.port,
  pool: config.database.pool
};
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
