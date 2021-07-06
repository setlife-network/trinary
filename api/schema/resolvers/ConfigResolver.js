const stripeHandler = require('../../handlers/stripe')

module.exports = {
    Query: {
        checkForValidStripeCredentials: (root, args, { cookies, models }) => {
            return stripeHandler.checkCredentials()
        }
    }
}
