const amazon = require('../handlers/amazon')
const fs = require('fs')

console.log('amazon');
console.log(amazon);
console.log('cred');
console.log(
    amazon.cred()
);

const file = amazon.cred()
    .then(res => {
        console.log('res');
        console.log(res.Body.toString('utf8'));
        return res.Body.toString('utf8')
    })
    .catch(err => {
        console.log('error', err);
    })
