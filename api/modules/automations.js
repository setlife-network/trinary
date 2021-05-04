const moment = require('moment')

const github = require('../handlers/github')
const { GITHUB } = require('../config/credentials')
const db = require('../models')

const automations = module.exports = (() => {

    const createClient = async ({ clientInformation }) => {
        const client = await getClientFromExternalId({ id: clientInformation.external_uuid })
        const email = await getClientFromEmail( { email: clientInformation.email })
        if (!client && !email) {
            return db.models.Client.create({
                email: clientInformation.email,
                currency: clientInformation.currency,
                name: clientInformation.name,
                is_active: 1,
                created_at: moment(clientInformation.date_created),
                updated_at: moment(clientInformation.date_created),
                external_uuid: clientInformation.external_uuid
            })
        } else if ((!client && email) || (client && email)) {
            updateClient({ clientInformation: clientInformation})
        }
    }

    const updateClient = async (params) => {
        let clientToUpdate
        if (params.clientInformation.external_uuid){
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    external_uuid: params.clientInformation.external_uuid
                }
            })
        }
        if (params.clientInformation.email && (clientToUpdate === null)){
            clientToUpdate = await db.models.Client.findOne({
                where: {
                    email: params.clientInformation.email
                }
            })
        }
        if (clientToUpdate) {
            return db.models.Client.update({
                email: params.clientInformation.email,
                currency: params.clientInformation.currency,
                name: params.clientInformation.name,
                updated_at: moment(params.clientInformation.date_created),
                external_uuid: params.clientInformation.external_uuid
            }, {
                where: {
                    id: clientToUpdate.id
                }
            })
        } else {
            createClient({ clientInformation: params.clientInformation })
        }
    }

    const createPayment = async ({ paymentInformation }) => {
        const client = await getClientFromExternalId({ id: paymentInformation.customer_id })
        if (client) {
            return db.models.Payment.create({
                amount: paymentInformation.amount,
                external_uuid: paymentInformation.external_uuid,
                date_incurred: moment(paymentInformation.date_incurred['_d']).format('YYYY-MM-DD HH:mm:ss'),
                client_id: client.id,
                external_uuid_type: paymentInformation.external_uuid_type
            })
        }

    }

    const getClientFromEmail = (params) => {
        return db.models.Client.findOne({
            where: {
                email: params.email
            }
        })
    }


    const getClientFromExternalId = (params) => {
        return db.models.Client.findOne({
            where: {
                external_uuid: params.id
            }
        })
    }

    const getPaymentFromExternalId = (params) => {
        return db.models.Payment.findOne({
            where: {
                external_uuid: params.id
            }
        })
    }

    const getPaymentFromId = (params) => {
        return db.models.Payment.findByPk(params.id)
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
            paymentToUpdate.payment = await getPaymentFromExternalId({ id: paymentInformation.external_uuid })
        } else {
            paymentToUpdate.payment = await getPaymentFromId({ id: paymentInformation.external_uuid })
        }
        paymentToUpdate.payment.date_paid = paymentInformation.date_paid
        await db.models.Payment.update({
            date_paid: moment(paymentToUpdate.payment.date_paid['_d'])
        }, {
            where: {
                id: paymentToUpdate.payment.id
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
            //do some update here
        } else {
            //the payment is not in the db, proceed to store it
            createPayment({ paymentInformation: params.paymentInformation })
        }
    }

    return {
        createClient,
        updateClient,
        createPayment,
        getUserOrganizations,
        getOrganizationRepos,
        updateDatePaidPayment,
        updatePaymentFromStripe
    }

})()
