module.exports = (() => {
    return {
        Allocation: {
            async payment (allocation) {
                return allocation.getPayments()
            },
            async proyect (allocation) {
                return allocation.getProyects()
            },
            async contributor (allocation) {
                return allocation.getContributors()
            }
        },
        Query: {
            getAllocation: async (root, { id }, { models }) => {
                return models.Allocation.findBy(id)
            },
            getAllocations: async (root, { models }) => {
                return models.Allocation.findAll()
            }
        },
        Mutations: {
            createAllocation: async (root, {
                id,
                amount,
                rate_type,
                active,
                date_created,
                date_paid,
                paymentId,
                proyectId,
                contributorId
            }) => {
                return models.Allocation.create({
                    amount,
                    rate_type,
                    active,
                    date_created,
                    date_paid,
                    paymentId,
                    proyectId,
                    contributorId
                })
            }
        }
    }
})
