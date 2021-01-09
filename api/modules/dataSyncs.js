const { split } = require('lodash')

const amazon = require('../handlers/amazon')
const github = require('../handlers/github')
const toggl = require('../handlers/toggl')
const db = require('../models')
const invoicelyCodebase = require('../scripts/invoicelyCodebase')
const timeLogging = require('../scripts/timeLogging')
const { INVOICELY_CSV_PATH } = require('../config/constants')
const { GITHUB, TOGGL } = require('../config/credentials')

const dataSyncs = module.exports = (() => {

    const findIssueByGithubUrl = async (url) => {
        return db.models.Issue.findOne({
            raw: true,
            where: {
                github_url: url
            }
        })
    }

    const syncGithubRepoContributors = async (params) => {
        //this func will add in the contributors table all the contributors from a github project
        const newContributors = []
        const githubContributors = await github.fetchRepoContributors({
            auth_key: GITHUB.CLIENT_SECRET,
            owner: GITHUB.OWNER,
            repo: params.repo
        })

        await Promise.all(githubContributors.map(async c => {
            //we look for mathing contributors in out db, if there's none add them
            const matchingContributor = await db.models.Contributor.findOne({
                where: {
                    github_id: c['id']
                }
            })
            if (!matchingContributor) {
                const contributorInfo = await github.fetchUserData({
                    auth_key: GITHUB.CLIENT_SECRET,
                    username: c.login
                })
                return newContributors.push(
                    db.models.Contributor.create({
                        name: contributorInfo.name ? contributorInfo.name : c.login,
                        github_id: c.id,
                        github_handle: c.html_url
                    })
                )
            }
        }))
        return newContributors
    }

    const syncGithubIssues = async (params) => {
        const newIssues = []
        const githubUrlSplitted = split(params.github_url, '/');
        const issues = await github.fetchRepoIssues({
            repo: githubUrlSplitted[githubUrlSplitted.length - 1]
        })
        await Promise.all(
            issues.map(async i => {
                const matchingIssue = await findIssueByGithubUrl(i.url)
                if (!matchingIssue) {
                    await db.models.Issue.create({
                        github_url: i.html_url,
                        github_number: i.number,
                        name: i.title,
                        date_opened: i.created_at,
                        date_closed: i.closed_at,
                        project_id: params.project_id
                    })
                        .then((createdIssue) => {
                            newIssues.push(createdIssue.get({ plain: true }))
                        })
                } else if (matchingIssue.date_closed != i.date_closed) {
                    await db.models.Issue.update({
                        date_closed: matchingIssue.date_closed
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
                .then(file => {
                    invoicelyCodebase.modelCSV(file)
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
        syncGithubRepoContributors,
        syncGithubIssues,
        syncInvoicelyCSV,
        syncProjectCollaboratorsPermission,
        syncTogglProject
    }
})()
