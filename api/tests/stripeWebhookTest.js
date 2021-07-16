const apiModules = require('../modules')

const runTest = () => {
    try {
        apiModules.clientManagement.updateClientFromStripeCustomer({
            stripeCustomerObject: {
    
            }
        })
    } catch (err) {
        console.log('error')
        console.log(err)
    }
}

runTest()