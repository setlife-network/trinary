const attributesMapping = module.exports = (() => {

    const allocationMap = (allocation ) => {
        return (
            {
                id: allocation.id,
                amount: allocation.amount,
                rateType: allocation.rate_type,
                active: allocation.active,
                createdAt: allocation.created_at,
                datePaid: allocation.date_paid
            }
        )
    }

    const clientMap = (client) => {
        return (
            {
                id: client.id,
                isActive: client.is_active,
                name: client.name,
                currency: client.currency
            }
        )
    }

    const contributorMap = (contributor) => {
        return (
            {
                id: contributor.id,
                hourlyRate: contributor.hourly_rate,
                weeklyRate: contributor.weekly_rate,
                monthlyRate: contributor.monthly_rate,
                name: contributor.name,
                externalDataUrl: contributor.external_data_url,
                githubId: contributor.github_id,
                githubHandle: contributor.github_handle
            }
        )
    }

    const issueMap = (issue) => {

        return (
            {
                id: issue.id,
                githubUrl: issue.github_url,
                projectId: issue.project_id
            }
        )
    }

    const paymentMap = (payment) => {
        return (
            {
                id: payment.id,
                amount: payment.amount,
                dateIncurred: payment.date_incurred,
                datePaid: payment.date_paid,
                clientId: payment.client_id,
            }
        )
    }

    const projectMap = (project) => {
        return (
            {
                id: project.id,
                expectedBudget: project.expected_budget,
                isActive: project.is_active,
                name: project.name,
                githubUrl: project.github_url,
                date: project.date,
                clientId: project.client_id
            }
        )
    }

    const timeEntryMap = (timeEntry) => {
        return (
            {
                id: timeEntry.id,
                seconds: timeEntry.seconds,
                togglId: timeEntry.togglId,
                startTime: timeEntry.startTime,
                contributorId: timeEntry.contributor_id,
                projectId: timeEntry.project_id
            }
        )
    }

    return {
        allocationMap,
        clientMap,
        contributorMap,
        issueMap,
        paymentMap,
        projectMap,
        timeEntryMap
    }

})()
