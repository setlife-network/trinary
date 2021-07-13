const apiModules = module.exports = (() => {
    return {
        paymentManagement: require('./paymentManagement'),
        authentication: require('./authentication'),
        automations: require('./automations'),
        budgeting: require('./budgeting'),
        clientManagement: require('./clientManagement'),
        dataSyncs: require('./dataSyncs')
    }
})()
