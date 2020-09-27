const { makeExecutableSchema, mergeResolvers, mergeTypes } = require('graphql-tools');
//import resolvers

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

])

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
