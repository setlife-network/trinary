const apiModules = require('../modules')

const runTest = () => {
    try {
        apiModules.budgeting.updateDatePaidPayment({
            stripeInvoice: {
                id: 'in_1JDRIQIXnygo2ixq1Qkz104Z',
                webhooked_delivered_at: 1626125976
            }
        })
    } catch (err) {
        console.log('error')
        console.log(err)
    }
}

runTest()