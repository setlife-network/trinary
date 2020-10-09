const amazon = require('../handlers/amazon')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')

const paymentFiles = module.exports = (() => {

    const invoiceFile = 'documents/payments/invoices-2019.csv'

    const fetchCSV = () => {
        amazon.fetchFile({ file: invoiceFile })
            .then(res => {
                invoicelyCodebase.modelCSV(res)
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
