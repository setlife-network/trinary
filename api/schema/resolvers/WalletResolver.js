const apiModules = require('../../modules')

module.exports = {

    Wallet: {
    },
    Query: {
    },
    Mutation: {
        updateContributorOnChainAddress: async (root, { contributor_id, address }, { cookies, models }) => {
            const contributorId = cookies.userSession ?? contributor_id
            const contributorWallet = await models.Wallet.findOne({
                where: {        
                    contributor_id: contributorId
                }
            })
            if (!contributorWallet) {
                const createFields = {
                    contributor_id: contributorId,
                    onchain_address: address
                }
                const wallet = await models.Wallet.create({
                    ...createFields
                })
                return wallet
            }
            await models.Wallet.update({
                onchain_address: address
            }, {
                where: {
                    id: contributorWallet.get('id')
                }
            })
            return models.Wallet.findOne({
                where: {        
                    contributor_id: contributorId
                }
            })
        }
    }

}