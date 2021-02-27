module.exports = {
    Rate: {
        contributor: (rate, args, { models }) => {
            return models.Contributor.findByPk(rate.contributor_id)
        }
    },
    Query: {
        getRateById: (root, { id }, { models }) => {
            return models.Rate.findByPk(id)
        },
        getRates: (root, args, { models }) => {
            return models.Rate.findAll()
        }
    },
    Mutation: {
        createRate: (root, { createFields }, { models }) => {
            return models.Rate.create({
                ...createFields
            })
        },
        deleteRateById: (root, { id }, { models }) => {
            return models.Rate.destroy({ where: { id } })
        },
        updateRateById: async (root, { id, updateFileds }, { models }) => {
            await models.Rate.update({
                ...updateFileds
            }, {
                where: { id }
            })
            return models.Rate.findByPk(id)
        }
    }
}
