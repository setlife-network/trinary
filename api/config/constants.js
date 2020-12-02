require('dotenv').config()

module.exports = {
    GITHUB_OAUTH_URL: 'https://github.com/login/oauth/access_token',
    INVOICELY_CSV_PATH: `${process.env.INVOICELY_CSV_PATH}`,
    SITE_ROOT: process.env.NODE_ENV == 'production'
        ? process.env.SITE_URL
        : 'http://localhost:6002',
    USER_AGENT: `${process.env.USER_AGENT}`
}
