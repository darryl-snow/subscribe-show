const graphql = require('graphql');
const mongoose = require('mongoose');
const WatchListItem = mongoose.model('watchListItem');
const Episode = mongoose.model('episode');
const WatchListItemType = require('./types/watchListItem');
const EpisodeType = require('./types/episode');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
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
        type: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { tmdbID, type }) {
        return(new WatchListItem({tmdbID, type}).save());
      }
    },
    toggleItemWatched: { // Toggle whether a watchlist item has been watched or not
      type: WatchListItemType,
      args: {
        WatchListItemID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { WatchListItemID }) {
        return WatchListItem.toggleWatched(WatchListItemID);
      }
    },
    toggleEpisodeWatched: { // Toggle whether a TV Show episode has been watched or not
      type: EpisodeType,
      args: {
        episodeID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { episodeID }) {
        return Episode.toggleWatched(episodeID);
      }
    }
  }
});
