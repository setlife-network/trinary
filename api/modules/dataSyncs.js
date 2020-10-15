const amazon = require('../handlers/amazon')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const { INVOICELY_CSV_PATH } = require('../config/constants')

const dataSyncs = module.exports = (() => {

    const syncInvoicelyCSV = () => {
        const invoiceFile = INVOICELY_CSV_PATH
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
        syncInvoicelyCSV
    }
})()
