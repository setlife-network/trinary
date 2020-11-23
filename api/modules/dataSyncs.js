const amazon = require('../handlers/amazon')
const github = require('../handlers/github')
const toggl = require('../handlers/toggl')
const db = require('../models')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const timeLogging = require('../scripts/timeLogging')
const { INVOICELY_CSV_PATH } = require('../config/constants')
const { GITHUB, TOGGL } = require('../config/credentials')

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
        const syncedPermissions = []
        await Promise.all(
            params.contributors.map(async c => {
                const urlInfo = params.github_url.split('/')
                const owner = urlInfo[urlInfo.length - 2]
                const repo = urlInfo[urlInfo.length - 1]
                const dbContributorPermission = await db.models.Permission.findOne({
                    raw: true,
                    where: {
                        project_id: params.project_id,
                        contributor_id: c.id
                    }
                })
                const githubContributorPermission = await github.fetchUserPermission({
                    auth_key: GITHUB.CLIENT_SECRET,
                    owner,
                    repo,
                    username: c.github_handle
                })
                //if the permission it's not already stored save it into the db
                //if is stored and the permission value it's not the same update it
                //if not don't do anything
                if (!dbContributorPermission) {
                    return syncedPermissions.push(
                        db.models.Permission.create({
                            type: githubContributorPermission,
                            contributor_id: c.id,
                            project_id: params.project_id
                        })
                    )
                } else if (dbContributorPermission.type != githubContributorPermission) {
                    syncedPermissions.push(dbContributorPermission)
                    return db.models.Permission.update({
                        type: githubContributorPermission,
                    }, {
                        where: {
                            contributor_id: c.id,
                            project_id: params.project_id
                        }
                    })
                }
            })
        )
        return syncedPermissions
    }

    const syncTogglProject = async (params) => {
        try {
            const timeEntries = await toggl.fetchWorkspaceTimeEntries({
                pId: params.toggl_project_id,
                wId: TOGGL.WORKSPACE_ID,
                since: params.since,
                until: params.until
            })
            const addedTimeEntries = await timeLogging.addTimeEntries({
                timeEntries,
                project_id: params.project_id
            })
        } catch (error) {
            console.log('error: ' + error);
            return
        }
        return true
    }

    return {
        syncInvoicelyCSV,
        syncProjectCollaboratorsPermission,
        syncTogglProject
    }
})()
