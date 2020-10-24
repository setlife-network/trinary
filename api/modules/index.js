const apiModules = module.exports = (() => {
    return {
        authentication: require('./authentication'),
        dataSyncs: require('./dataSyncs')
    }
})()
