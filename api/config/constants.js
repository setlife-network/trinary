require('dotenv').config()

module.exports = {
    GITHUB_OAUTH_URL: 'https://github.com/login/oauth/access_token',
    INVOICELY_CSV_PATH: `${process.env.INVOICELY_CSV_PATH}`
}
