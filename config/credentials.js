require('dotenv').config()

module.exports = {
    // MYSQL Access Keys
    MYSQL:{
        DB_HOST: process.env.MYSQL_DB_HOST,
        DB_USERNAME: process.env.MYSQL_DB_USERNAME,
        DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
        DB_NAME: process.env.MYSQL_DB_NAME,
    }
};
