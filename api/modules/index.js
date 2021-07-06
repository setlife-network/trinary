const apiModules = module.exports = (() => {
    return {
        authentication: require('./authentication'),
        dataSyncs: require('./dataSyncs'),
        automations: require('./automations'),
        clientManagement: require('./clientManagement')
    }
})()
