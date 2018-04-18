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

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: WatchListItemType,
      args: {
        tmdbID: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { tmdbID, type }) {
        return(new WatchListItem({tmdbID, type}).save());
      }
    },
    addEpisode: {
      type: WatchListItemType,
      args: {
        watchListItemID: { type: new GraphQLNonNull(GraphQLID) },
        tmdbEpisodeID: { type: new GraphQLNonNull(GraphQLString) },
        seasonNumber: { type: GraphQLInt },
        episodeNumber: { type: GraphQLInt },
        airDate: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        watched: { type: GraphQLBoolean }
      },
      resolve(parentValue, args) {
        return WatchListItem.addEpisode(args);
      }
    },
    toggleEpisodeWatched: {
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
