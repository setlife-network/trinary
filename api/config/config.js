const { MYSQL } = require('./credentials');

module.exports = {
    'development': {
        'username': MYSQL.username,
        'password': MYSQL.password,
        'database': MYSQL.database,
        'host': MYSQL.DB_NAME,
        'dialect': 'mysql',
        'operatorsAliases': false
    },
    'test': {
        'username': 'root',
        'password': null,
        'database': 'database_test',
        'host': '127.0.0.1',
        'dialect': 'mysql',
        'operatorsAliases': false
    },
    'production': {
        'username': 'root',
        'password': null,
        'database': 'database_production',
        'host': '127.0.0.1',
        'dialect': 'mysql',
        'operatorsAliases': false
    }
};
