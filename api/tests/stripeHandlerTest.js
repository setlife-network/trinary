//const stripe = require('../handlers/stripe')
const apiModules = require('../modules');

// console.log('stripe');
// console.log(stripe);
//console.log('stripe.requestPaymentIntent()');

// stripe.requestPaymentIntent()
//     .then(response => {
//         console.log('response: ');
//         console.log(response);
//     })
//     .catch(error => {
//         console.log('error: ' + error);
//     })

console.log('stripe.createInvoice');

// apiModules.createInvoice({
//     clientId: 1,
//     amount: '3000',
//     currency: 'USD'
// })
console.log('apiModules');
console.log(apiModules);
console.log('apiModules.paymentManagement.handleStripeIncomingPayment');
console.log(apiModules.paymentManagement.handleStripeIncomingPayment);
apiModules.paymentManagement.handleStripeIncomingPayment({
    clientId: 1,
    amount: 3000,
    currency: 'USD'
})
