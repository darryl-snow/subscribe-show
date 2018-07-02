const graphql = require('graphql');
const mongoose = require('mongoose');

const WatchListItemType = require('./types/watchListItem');
const EpisodeType = require('./types/episode');

const WatchListItem = mongoose.model('watchListItem');
const Episode = mongoose.model('episode');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = graphql;

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
        return (new WatchListItem({ tmdbID, type }).save());
      },
    },
    removeItem: {
      type: WatchListItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return WatchListItem.remove({ _id: id });
      },
    },
    toggleItemWatched: { // Toggle whether a watchlist item has been watched or not
      type: WatchListItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return WatchListItem.toggleWatched(id);
      },
    },
    toggleEpisodeWatched: { // Toggle whether a TV Show episode has been watched or not
      type: EpisodeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Episode.toggleWatched(id);
      },
    },
  },
});
