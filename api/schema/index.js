const { makeExecutableSchema } = require('graphql-tools');
const { mergeResolvers, mergeTypes } = require('merge-graphql-schemas');
//import resolvers
//import types
//merge types
const typeDefs = mergeTpes[(

)]
//merge resolvers
const resolvers = mergeResolvers([

])


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
