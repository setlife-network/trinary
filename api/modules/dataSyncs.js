const { split } = require('lodash')

const amazon = require('../handlers/amazon')
const github = require('../handlers/github')
const toggl = require('../handlers/toggl')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const timeLogging = require('../scripts/timeLogging')
const { INVOICELY_CSV_PATH } = require('../config/constants')
const db = require('../models')

const dataSyncs = module.exports = (() => {

    const matchIssue = async (issue) => {
        return db.models.Issue.findOne({
            raw: true,
            where: {
                github_url: issue.url
            }
        })
    }

    const syncGithubIssues = async (params) => {
        const newIssues = []
        const githubUrlSplitted = split(params.github_url, '/');
        const issues = await github.fetchRepoIssues({
            repo: githubUrlSplitted[githubUrlSplitted.length - 1]
        })
        await Promise.all(
            issues.map(async i => {
                const mathingIssue = await matchIssue(i)
                if (!mathingIssue) {
                    await db.models.Issue.create({
                        github_url: i.url,
                        date_opened: i.created_at,
                        date_closed: i.closed_at,
                        project_id: params.project_id
                    })
                        .then((res) => {
                            newIssues.push(res.get({ plain: true }))
                        })
                } else if (mathingIssue.date_closed != i.date_closed) {
                    await db.models.Issue.update({
                        date_closed: mathingIssue.date_closed
                    }, {
                        where: {
                            id: i.id
                        }
                    })
                }
            })
        )
        return newIssues
    }

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
        const timeEntries = await toggl.fetchProjectTimeEntries({ projectId: params.togglProjectId })
        const addedTimeEntries = await timeLogging.addTimeEntries({
            timeEntries,
            projectId: params.projectId
        })
        if (addedTimeEntries == undefined) {
            throw new Error('Something went wrong')
        }
        return 'Success'
    }

    return {
        syncGithubIssues,
        syncInvoicelyCSV,
        syncTogglProject
    }
})()
