const amazon = require('../handlers/amazon')

const paymentFiles = module.exports = (() => {

    const bucket = 'project-trinary'
    const invoiceFile = 'documents/payments/invoices-2019.csv'

    const fileBucket = {
        Bucket: bucket,
        Key: invoiceFile
    }

    const fetchCSV = () => {
        amazon.fetchCSV(fileBucket)
            .then(res => {
                console.log('res');
                console.log(res.Body.toString('utf8'));
                return res.Body.toString('utf8')
            })
            .catch(err => {
                console.log('error', err);
            })
    }

    return {
        fetchCSV
    }

})()
