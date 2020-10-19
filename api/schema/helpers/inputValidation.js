const { UserInputError } = require('apollo-server')
const moment = require('moment')

module.exports = (() => {
    return {
        validateDateFormat: (date) => {
            if (date) date = moment(date, 'YYYY-MM-DD', true).utc()
            if (date && !date.isValid()) {
                throw new UserInputError('Date format invalid');
            } else {
                return date
            }
        }
    }
})()
