const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    STRIPE: {
        API_KEY: process.env.SRIPE_API_KEY
    }
}
