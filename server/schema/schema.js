const graphql = require('graphql');
const {
  GraphQLSchema
} = graphql;

const RootQuery = require('./rootQuery');
const Mutations = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
