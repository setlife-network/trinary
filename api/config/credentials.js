require('dotenv').config()

module.exports = {
    // MYSQL Access Keys
    MYSQL: {
        DB_HOST: process.env.MYSQL_DB_HOST,
        DB_USERNAME: process.env.MYSQL_DB_USERNAME,
        DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
        DB_NAME: process.env.MYSQL_DB_NAME,

        // DB_HOST: 'nwhazdrp7hdpd4a4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        // DB_USERNAME: 'do1yh5ap76z7zw6g',
        // DB_PASSWORD: 'l5iy5am7d55i3fp3',
        // DB_NAME: 'djssift4nnmeirey',
    }
};
