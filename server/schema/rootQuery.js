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

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    watchListItems: {
      type: new GraphQLList(WatchListItemType),
      resolve() {
        return WatchListItem.find({});
      }
    },
    watchListItem: {
      type: WatchListItemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return WatchListItem.findById(id);
      }
    },
    episode: {
      type: EpisodeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Episode.findById(id);
      }
    },
    unwatchedEpisodes: {
      type: new GraphQLList(EpisodeType),
      resolve() {
        return Episode.find({ watched: false });
      }
    },
    search: {
      type: new GraphQLList(WatchListItemType),
      args: { title: { type: GraphQLString } },
      resolve(parentValue, { title }) {
        return WatchListItem.search(title);
      }
    }
  }
});
