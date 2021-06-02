const moment = require('moment')

const github = require('../handlers/github')
const { GITHUB } = require('../config/credentials')
const db = require('../models')

const automations = module.exports = (() => {

    const createPayment = async ({ paymentInformation }) => {
        const client = await getClientWithExternalId({ id: paymentInformation.customer_id })
        if (client) {
            return db.models.Payment.create({
                amount: paymentInformation.amount,
                external_uuid: paymentInformation.external_uuid,
                date_incurred: moment(paymentInformation.date_incurred['_d']).format('YYYY-MM-DD HH:mm:ss'),
                date_paid: paymentInformation.date_paid ? moment(paymentInformation.date_paid['_d']) : null,
                client_id: client.id,
                external_uuid_type: paymentInformation.external_uuid_type
            })
        }
    }

    const getClientWithExternalId = (params) => {
        return db.models.Client.findOne({
            where: {
                external_uuid: params.id
            }
        })
    }

    const getPaymentWithExternalId = (params) => {
        return db.models.Payment.findOne({
            where: {
                external_uuid: params.id
            },
            raw: true,
        })
    }

    const getPaymentWithId = (params) => {
        return db.models.Payment.findByPk(params.id, {
            raw: true
        })
    }

    const getUserOrganizations = async (params) => {
        //user organizations are the organizations that the contributor is added as a internal collaborator
        //we also add the self github contributor user for implementation details
        //userOrganizations = github organizations + github user
        const githubContributorUser = await github.fetchAuthUserData({
            auth_key: params.auth_key
        })
        const githubUserOrganizations = await github.fetchUserOrganizations({
            auth_key: params.auth_key
        })
        const userOrganizations = []
        userOrganizations.push({
            id: githubContributorUser.id,
            avatar: githubContributorUser.avatar_url,
            name: githubContributorUser.login
        })
        githubUserOrganizations.map(o => {
            userOrganizations.push({
                id: o.id,
                avatar: o.avatar_url,
                name: o.login
            })
        })
        return userOrganizations
    }

    const getOrganizationRepos = async (params) => {
        const organizations = await getUserOrganizations({
            auth_key: params.auth_key
        })
        const repos = await github.fetchRepos({
            auth_key: params.auth_key
        })
        organizations.map(async o => {
            const organizationRepos = []
            repos.map(r => {
                if (r.owner.login == o.name) {
                    organizationRepos.push({
                        id: r.id,
                        name: r.name,
                        githubUrl: r.html_url,
                    })
                }
            })
            o.repos = organizationRepos
        })
        return organizations
    }

    const updateDatePaidPayment = async ({ paymentInformation }) => {
        const paymentToUpdate = {}
        if (paymentInformation.external_uuid) {
            Object.assign(paymentToUpdate, await getPaymentWithExternalId({ id: paymentInformation.external_uuid }))
        } else {
            Object.assign(paymentToUpdate, await getPaymentWithId({ id: paymentInformation.id }))
        }

        paymentToUpdate.date_paid = paymentInformation.date_paid
        await db.models.Payment.update({
            date_paid: moment(paymentToUpdate.date_paid, 'YYYY-MM-DD')
        }, {
            where: {
                id: paymentToUpdate.id
            }
        })

    }

    const updatePaymentFromStripe = async (params) => {
        const paymentToUpdate = await db.models.Payment.findOne({
            where: {
                external_uuid: params.paymentInformation.external_uuid,
                external_uuid_type: params.paymentInformation.external_uuid_type
            }
        })
        if (paymentToUpdate) {
            if (params.paymentInformation.date_paid) {
                updateDatePaidPayment({ paymentInformation: params.paymentInformation })
            }
        } else {
            //the payment is not in the db, proceed to store it
            createPayment({ paymentInformation: params.paymentInformation })
        }
    }

    return {
        createPayment,
        getClientWithExternalId,
        getUserOrganizations,
        getOrganizationRepos,
        updateDatePaidPayment,
        updatePaymentFromStripe
    }

})()
