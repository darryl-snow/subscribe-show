const graphql = require('graphql');
const mongoose = require('mongoose');
const Episode = mongoose.model('episode');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

/**
 * The GraphQL object to represent the Episode model.
 * @type {GraphQLObjectType}
 */
module.exports = new GraphQLObjectType({
  name: 'Episode',
  fields: () => ({
    tmdbEpisodeID: { type: GraphQLString },
    seasonNumber: { type: GraphQLInt },
    episodeNumber: { type: GraphQLInt },
    airDate: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    watched: { type: GraphQLBoolean },
    watchListItem: {
      type: require('./watchListItem'),
      resolve(parentValue) {
        return Episode.findById(parentValue).populate('watchListItem')
          .then(episode => {
            return episode.watchListItem;
          });
      }
    }
  })
});
