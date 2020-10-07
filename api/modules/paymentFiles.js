const amazon = require('../handlers/amazon')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')

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
            .then(json => {
                console.log('json');
                console.log(json);
                invoicelyCodebase.modelCSV(json)
            })
            .catch(err => {
                console.log('error', err);
            })
    }

    return {
        fetchCSV
    }

})()
