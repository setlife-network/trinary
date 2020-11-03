const amazon = require('../handlers/amazon')
const toggl = require('../handlers/toggl')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const timeEntriesCodebase = require('../scripts/timeEntriesCodebase')
const { INVOICELY_CSV_PATH } = require('../config/constants')

const dataSyncs = module.exports = (() => {

    const syncInvoicelyCSV = async () => {
        const invoiceFile = INVOICELY_CSV_PATH
        return (
            amazon.fetchFile({ file: invoiceFile })
                .then(res => {
                    invoicelyCodebase.modelCSV(res)
                    return 'Success'
                })
                .catch(err => {
                    console.log('error', err);
                    return err.message
                })
        )
    }

    const syncTogglProject = async (params) => {
        return (
            toggl.fetchProjectTimeEntries({ projectId: params.togglProjectId })
                .then(timeEntries => {
                    timeEntriesCodebase.addTimeEntries({
                        timeEntries,
                        projectId: params.projectId
                    })
                    return 'Success'
                })
                .catch(err => {
                    console.log('error', err);
                    return err.message
                })
        )
    }

    return {
        syncInvoicelyCSV,
        syncTogglProject
    }
})()
