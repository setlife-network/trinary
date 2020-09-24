require('dotenv').config()

module.exports = {
    // 3rd Party App Access Keys
    GITHUB: process.env.GITHUB,
    TOGGL: {
        API_KEY: process.env.TOGGL_API_KEY,
    },
    // MYSQL Access Keys
    MYSQL: {
        DB_HOST: 'nwhazdrp7hdpd4a4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        DB_USERNAME: 'do1yh5ap76z7zw6g',
        DB_PASSWORD: 'l5iy5am7d55i3fp3',
        DB_NAME: 'djssift4nnmeirey'
    }
};
