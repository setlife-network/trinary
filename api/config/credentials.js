require('dotenv').config()

module.exports = {
    // 3rd Party App Access Keys
    AMAZON_AWS: {
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET: process.env.AWS_SECRET,
        S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
    },
    GITHUB: {
        OWNER: `${process.env.GITHUB_OWNER}`,
        OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    },
    STRIPE: {
        API_KEY: process.env.STRIPE_API_KEY,
        SECRET: process.env.STRIPE_SECRET,
    },
    TOGGL: {
        API_KEY: process.env.TOGGL_API_KEY,
        WORKSPACE_ID: process.env.TOGGL_WORKSPACE_ID
    },
    // MYSQL Access Keys
    MYSQL: {
        DB_HOST: process.env.MYSQL_DB_HOST,
        DB_USERNAME: process.env.MYSQL_DB_USERNAME,
        DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
        DB_NAME: process.env.MYSQL_DB_NAME
    }
};
