const { makeExecutableSchema } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

//import resolvers
const AllocationResolver = require('./resolvers/AllocationResolver')
const ClientResolver = require('./resolvers/ClientResolver')
const ContributorResolver = require('./resolvers/ContributorResolver')
const IssueResolver = require('./resolvers/IssueResolver')
const PaymentResolver = require('./resolvers/PaymentResolver')
const PermissionResolver = require('./resolvers/PermissionResolver')
const ProjectResolver = require('./resolvers/ProjectResolver')
const TimeEntryResolver = require('./resolvers/TimeEntryResolver')

//import types
const AllocationType = require('./types/AllocationType')
const ClientType = require('./types/ClientType')
const ContributorType = require('./types/ContributorType')
const IssueType = require('./types/IssueType')
const PaymentType = require('./types/PaymentType')
const PermissionType = require('./types/PermissionType')
const ProjectType = require('./types/ProjectType')
const TimeEntry = require('./types/TimeEntryType')

//merge types
const typeDefs = mergeTypeDefs([
    AllocationType,
    ClientType,
    ContributorType,
    IssueType,
    PaymentType,
    PermissionType,
    ProjectType,
    TimeEntry
])

//merge resolvers
const resolvers = mergeResolvers([
    AllocationResolver,
    ClientResolver,
    ContributorResolver,
    IssueResolver,
    PaymentResolver,
    PermissionResolver,
    ProjectResolver,
    TimeEntryResolver
])

// Export generated schema
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});
