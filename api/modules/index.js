const apiModules = module.exports = (() => {
    return {
        accessManagement: require('./accessManagement'),
        authentication: require('./authentication'),
        automations: require('./automations'),
        budgeting: require('./budgeting'),
        clientManagement: require('./clientManagement'),
        dataSyncs: require('./dataSyncs'),
        paymentManagement: require('./paymentManagement'),
    }
})()
