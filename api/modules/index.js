const apiModules = module.exports = (() => {
    return {
        paymentManagement: require('./paymentManagement'),
        authentication: require('./authentication'),
        automations: require('./automations'),
        clientManagement: require('./clientManagement'),
        dataSyncs: require('./dataSyncs')
    }
})()
