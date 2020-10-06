require('dotenv').config()

module.exports = {
    // 3rd Party App Access Keys
    GITHUB: process.env.GITHUB,
    TOGGL: {
        API_KEY: process.env.TOGGL_API_KEY,
    },
    AMAZON_AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    },
    // MYSQL Access Keys
    MYSQL: {
        DB_HOST: process.env.MYSQL_DB_HOST,
        DB_USERNAME: process.env.MYSQL_DB_USERNAME,
        DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
        DB_NAME: process.env.MYSQL_DB_NAME
    }
};
