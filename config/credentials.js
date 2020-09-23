const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    TOGGL: {
        API_KEY: process.env.TOGGL_API_KEY,
    },


};
