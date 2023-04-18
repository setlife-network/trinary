const { makeExecutableSchema } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

//import resolvers
const AllocationResolver = require('./resolvers/AllocationResolver')
const ClientResolver = require('./resolvers/ClientResolver')
const ContributionResolver = require('./resolvers/ContributionResolver')
const ConfigResolver = require('./resolvers/ConfigResolver')
const ContributorResolver = require('./resolvers/ContributorResolver')
const directiveResolvers = require('./resolvers/DirectiveResolvers')
const IssueResolver = require('./resolvers/IssueResolver')
const PaymentResolver = require('./resolvers/PaymentResolver')
const PermissionResolver = require('./resolvers/PermissionResolver')
const ProjectResolver = require('./resolvers/ProjectResolver')
const RateResolver = require('./resolvers/RateResolver')
const TimeEntryResolver = require('./resolvers/TimeEntryResolver')

//import types
const AllocationType = require('./types/AllocationType')
const ClientType = require('./types/ClientType')
const ConfigType = require('./types/ConfigType')
const ContributionType = require('./types/ContributionType')
const ContributorType = require('./types/ContributorType')
const IssueType = require('./types/IssueType')
const PaymentType = require('./types/PaymentType')
const PermissionType = require('./types/PermissionType')
const ProjectType = require('./types/ProjectType')
const RateType = require('./types/RateType')
const TimeEntry = require('./types/TimeEntryType');

//merge types
const typeDefs = mergeTypeDefs([
    AllocationType,
    ClientType,
    ConfigType,
    ContributionType,
    ContributorType,
    IssueType,
    PaymentType,
    PermissionType,
    ProjectType,
    RateType,
    TimeEntry
])

//merge resolvers
const resolvers = mergeResolvers([
    AllocationResolver,
    ClientResolver,
    ConfigResolver,
    ContributionResolver,
    ContributorResolver,
    IssueResolver,
    PaymentResolver,
    PermissionResolver,
    ProjectResolver,
    RateResolver,
    TimeEntryResolver
])

// Export generated schema
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers
});
