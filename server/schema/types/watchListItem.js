const graphql = require('graphql');
const mongoose = require('mongoose');
const WatchListItem = mongoose.model('watchListItem');
const EpisodeType = require('./episode');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'WatchListItem',
  fields: () => ({
    id: { type: GraphQLString },
    tmdbID: { type: GraphQLString },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    airDate: { type: GraphQLString },
    language: { type: GraphQLString },
    type: { type: GraphQLString },
    episodes: {
      type: new GraphQLList(EpisodeType),
      resolve(parentValue) {
        return WatchListItem.findEpisodes(parentValue.id);
      }
    }
  })
});
