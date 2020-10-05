const stripe = require('../handlers/stripe')

console.log('stripe');
console.log(stripe);
console.log('stripe.requestPaymentIntent()');

stripe.requestPaymentIntent()
    .then(response => {
        console.log('response: ');
        console.log(response);
    })
    .catch(error => {
        console.log('error: ' + error);
    })
