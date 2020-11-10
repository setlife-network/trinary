const amazon = require('../handlers/amazon')
const github = require('../handlers/github')

const db = require('../models')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const { INVOICELY_CSV_PATH } = require('../config/constants')
const { GITHUB } = require('../config/credentials')

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

    const syncProjectCollaboratorsPermission = async (params) => {
        /*
        params = {
            project_id: id,
            github_url: https://github.com/setlife-network/project-trinary,
            contributors = [{
                id,
                name
            }]
        }
        */
        await Promise.all(
            params.contributos.map(async c => {
                const urlInfo = params.github_url.split('/')
                const owner = urlInfo[urlInfo.length - 2]
                const repo = urlInfo[urlInfo.length - 1]
                const userPermission = await github.fetchUserPermission({
                    auth_key: GITHUB.CLIENT_SECRET,
                    owner,
                    repo,
                    username: c.name
                })
                db.models.Permission.create({
                    type: userPermission.permission,
                    contributor_id: c.id,
                    project_id: params.project_id
                })

            })
        )
    }

    return {
        syncInvoicelyCSV,
        syncProjectCollaboratorsPermission
    }
})()
