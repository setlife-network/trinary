
require('dotenv').config()
console.log('process.env.MYSQL_DB_HOST');
console.log(process.env);
module.exports = {
    GITHUB: process.env.GITHUB,
    // MYSQL Access Keys
    MYSQL: {
        DB_HOST: 'nwhazdrp7hdpd4a4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        DB_USERNAME: 'do1yh5ap76z7zw6g',
        DB_PASSWORD: 'l5iy5am7d55i3fp3',
        DB_NAME: 'djssift4nnmeirey'
    }
};
