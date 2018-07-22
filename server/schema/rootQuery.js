const graphql = require('graphql')
const mongoose = require('mongoose')
const WatchListItemType = require('./types/watchListItem')
const EpisodeType = require('./types/episode')
const UserType = require('./types/user')

const WatchListItem = mongoose.model('watchListItem')
const Episode = mongoose.model('episode')
const { errorName } = require('../services/errors')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql

/**
 * The query object, containing all queries for the aplication.
 * @type {GraphQLObjectType}
 */
module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    episode: { // Get a single TV episode
      type: EpisodeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Episode.findById(id)
      },
    },
    episodes: { // Get all episodes for a given TV show.
      type: new GraphQLList(EpisodeType),
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return WatchListItem.getAllEpisodes(id)
      },
    },
    search: { // Search for a TV Show or Movie.
      type: new GraphQLList(WatchListItemType),
      args: { title: { type: GraphQLString } },
      resolve(parentValue, { title }) {
        return WatchListItem.search(title)
      },
    },
    unwatchedEpisodes: { // Get all unwatched episodes for all TV Shows.
      type: new GraphQLList(EpisodeType),
      resolve() {
        return Episode.find({ watched: false })
      },
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      },
    },
    unwatchedItems: { // Get all unwatched watchlist items.
      type: new GraphQLList(WatchListItemType),
      resolve() {
        return WatchListItem.find({ watched: false })
      },
    },
    watchListItem: { // Get a single item (TV Show or Movie).
      type: WatchListItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return WatchListItem.findById(id)
      },
    },
    watchListItemByTitle: { // Get a single item (TV Show or Movie) by its title.
      type: WatchListItemType,
      args: { title: { type: GraphQLString } },
      resolve(parentValue, { title }) {
        return WatchListItem.findByTitle(title)
      },
    },
    watchListItems: { // Get entire watchlist.
      type: new GraphQLList(WatchListItemType),
      resolve(parentValue, args, req) {
        try {
          if (!req.user) {
            throw new Error(errorName.UNAUTHORIZED)
          }
          return WatchListItem.find({ user: req.user.id })
        } catch (err) {
          throw err.message
        }
      },
    },
  },
})
