const { UserInputError } = require('apollo-server')
const moment = require('moment')
const { mapKeys } = require('lodash')

module.exports = (() => {
    return {
        validateDatesFormat: ( date ) => {
            mapKeys(date, (value, key) => {
                if (value) {
                    value = moment(value, 'YYYY-MM-DD', true).utc()
                }
                if (value && !value.isValid()) {
                    throw new UserInputError(`Invalid date format: ${key}`);
                }
            })
            return date
        }
    }
})()
