const amazon = require('../handlers/amazon')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')

const paymentFiles = module.exports = (() => {

    //TODO: Move these constants somewhere else
    const bucket = 'project-trinary'
    const invoiceFile = 'documents/payments/invoices-2019.csv'

    const fileBucket = {
        Bucket: bucket,
        Key: invoiceFile
    }

    const fetchCSV = () => {
        amazon.fetchCSV(fileBucket)
            .then(res => {
                return res.Body.toString('utf8')
            })
            .then(json => {
                invoicelyCodebase.modelCSV(json)
            })
            .catch(err => {
                console.log('error', err);
                return err.message
            })
    }

    return {
        fetchCSV
    }

})()
