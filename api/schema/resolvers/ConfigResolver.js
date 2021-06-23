const { AuthenticationError } = require('apollo-server')
const { col, fn } = require('sequelize')

const toggl = require('../../handlers/toggl')
const apiModules = require('../../modules')

module.exports = {
    Query: {
        checkForValidStripeCredentials: (root, args, { cookies, models }) => {
            return ''
        }
    }
}
