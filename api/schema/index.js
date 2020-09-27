const { makeExecutableSchema, mergeResolvers, mergeTypes } = require('graphql-tools');

//import resolvers
const AllocationResolver = require('./resolvers/AllocationResolver')
const ClientResolver = require('./resolvers/ClientResolver')
const ContributorResolver = require('./resolvers/ContributorResolver')
const IssueResolver = require('./resolvers/IssueResolver')
const PaymentResolver = require('./resolvers/PaymentResolver')
const ProjectResolver = require('./resolvers/ProjectResolver')
const TimeEntryResolver = require('./resolvers/TimeEntryResolver')

//import types
const AllocationType = require('./types/AllocationType')
const ClientType = require('./types/ClientType')
const ContributorType = require('./types/ContributorType')
const IssueType = require('./types/IssueType')
const PaymentType = require('./types/PaymentType')
const ProjectType = require('./types/ProjectType')
const TimeEntry = require('./types/TimeEntryType')

//merge types
const typeDefs = mergeTpes[(
    AllocationType,
    ClientType,
    ContributorType,
    IssueType,
    PaymentType,
    ProjectType,
    TimeEntry
)]

//merge resolvers
const resolvers = mergeResolvers([
    AllocationResolver,
    ClientResolver,
    ContributorResolver,
    IssueResolver,
    PaymentResolver,
    ProjectResolver,
    TimeEntryResolver
])

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
