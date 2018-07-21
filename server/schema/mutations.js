const graphql = require('graphql')
const mongoose = require('mongoose')

const EpisodeType = require('./types/episode')
const UserType = require('./types/user')
const WatchListItemType = require('./types/watchListItem')

const AuthService = require('../services/auth')

const Episode = mongoose.model('episode')
const WatchListItem = mongoose.model('watchListItem')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = graphql

/**
 * The mutations object, containing all mutations for the aplication.
 * @type {GraphQLObjectType}
 */
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: { // Add a new item to the watchlist (TV Show or Movie)
      type: WatchListItemType,
      args: {
        tmdbID: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { tmdbID, type }) {
        return (new WatchListItem({ tmdbID, type }).save())
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req })
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      },
    },
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.register({ email, password, req })
      },
    },
    removeItem: {
      type: WatchListItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        Episode.remove({ watchListItem: { _id: id } }) // First remove all episodes, if any
          .then(() => WatchListItem.remove({ _id: id })) // Remove the item itself
      },
    },
    toggleItemWatched: { // Toggle whether a watchlist item has been watched or not
      type: WatchListItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return WatchListItem.toggleWatched(id)
      },
    },
    toggleEpisodeWatched: { // Toggle whether a TV Show episode has been watched or not
      type: EpisodeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Episode.toggleWatched(id)
      },
    },
  },
})
