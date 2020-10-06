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
        console.log(res);
        return res
    })
    .then(buff => {
        console.log('buff');
        console.log(buff);
        console.log('buff.Body');

        console.log(buff.Body);
        fs.readFile(buff.Body, 'utf8', (err, data) => {

            console.log('data');
            console.log(data);
            if (err) throw err;
        });
    })
    .catch(err => {
        console.log('ERROR', err);
    })
