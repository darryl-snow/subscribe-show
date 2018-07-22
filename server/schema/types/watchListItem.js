const graphql = require('graphql')
const mongoose = require('mongoose')

const User = mongoose.model('user')
const WatchListItem = mongoose.model('watchListItem')

const EpisodeType = require('./episode')
const UserType = require('./user')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = graphql

/**
 * The GraphQL object to represent the WatchListItem model.
 * @type {GraphQLObjectType}
 */
module.exports = new GraphQLObjectType({
  name: 'WatchListItem',
  fields: () => ({
    id: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.id)
      },
    },
    tmdbID: { type: GraphQLString },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    airDate: { type: GraphQLString },
    language: { type: GraphQLString },
    watched: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    isInWatchList: { type: GraphQLBoolean },
    episodes: {
      type: new GraphQLList(EpisodeType),
      resolve(parentValue) {
        return WatchListItem.getAllEpisodes(parentValue.id)
      },
    },
  }),
})
