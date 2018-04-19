const graphql = require('graphql');
const mongoose = require('mongoose');
const WatchListItemType = require('./types/watchListItem');
const EpisodeType = require('./types/episode');
const WatchListItem = mongoose.model('watchListItem');
const Episode = mongoose.model('episode');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

/**
 * The query object, containing all queries for the aplication.
 * @type {GraphQLObjectType}
 */
module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    watchListItems: { // Get entire watchlist
      type: new GraphQLList(WatchListItemType),
      resolve() {
        return WatchListItem.find({});
      }
    },
    watchListItem: { // Get a single item (TV Show or Movie)
      type: WatchListItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return WatchListItem.findById(id);
      }
    },
    episode: { // Get a single TV episode
      type: EpisodeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Episode.findById(id);
      }
    },
    unwatchedEpisodes: { // Get all unwatched episodes for all TV Shows
      type: new GraphQLList(EpisodeType),
      resolve() {
        return Episode.find({ watched: false });
      }
    },
    search: { // Search for a TV Show or Movie
      type: new GraphQLList(WatchListItemType),
      args: { title: { type: GraphQLString } },
      resolve(parentValue, { title }) {
        return WatchListItem.search(title);
      }
    }
  }
});
