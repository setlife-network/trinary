const { fetchUserData } = require('../handlers/github')
const db = require('../models')

const authentication = module.exports = (() => {

    const getContributor = async (params) => {
        const githubContributor = await fetchUserData({ auth_key: params })
        const contributor = await db.models.Contributor.findOne({
            where: {
                github_handle: githubContributor.id
            }
        })
        if (contributor) console.log('Contributor found');
        else createContributor(githubContributor)
    }

    const createContributor = async (githubContributor) => {
        await db.models.Contributor.create({
            name: githubContributor.name,
            github_id: githubContributor.githubUrl,
            github_handle: githubContributor.id,
            weekly_rate: '',
            hourly_rate: '',
            monthly_rate: ''
        })
    }

    return {
        createContributor,
        getContributor
    }

})()
