require('dotenv').config()

module.exports = {
    // 3rd Party App Access Keys
    AWS: {
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET: process.env.AWS_SECRET,
        S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
    },
    GITHUB: {
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    },
    STRIPE: {
        API_KEY: process.env.STRIPE_API_KEY,
        SECRET: process.env.STRIPE_SECRET,
    },
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
