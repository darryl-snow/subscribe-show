const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const mongoose = require('mongoose');
const WatchListItem = mongoose.model('watchListItem');
const Episode = mongoose.model('episode');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

const WatchListItemType = new GraphQLObjectType({
  name: 'WatchListItem',
  fields: () => ({
    id: { type: GraphQLString },
    tmdbID: { type: GraphQLString },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
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

const EpisodeType = new GraphQLObjectType({
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
      type: WatchListItemType,
      resolve(parentValue) {
        return Episode.findById(parentValue).populate('watchListItem')
          .then(episode => {
            return episode.watchListItem;
          });
      }
    }
  })
});

function parseTVSearchResults(response) {
  let results = [];

  response.map(item => {

    let { id, name, summary, language, image } = item.show;
    let show = {};

    show.tmdbID = id;
    show.title = name;
    show.description = summary;
    show.language = language;
    show.type = "TV";

    if (image)
      show.image = image.original;

    results.push(show);

  });

  return results;

}

function parseMovieSearchResults(response) {
  let results = [];

  response.map(show => {
    results.push({
      tmdbID: show.id,
      title: show.name || show.title,
      image: 'https://image.tmdb.org/t/p/original' + show.poster_path,
      description: show.overview,
      language: parseLanguage(show.original_language),
      type: "Movie"
    })
  });

  return results;

}

function parseLanguage(code) {

  switch(code) {
    case "en":
      return "English";
    case "fr":
      return "French";
    case "de":
      return "German";
    case "it":
      return "Italian";
    case "es":
      return "Spanish";
    case "zh":
      return "Chinese";
    default:
      return "Unknown";
  }

}

const search = (title) => {
  return new Promise((resolve, reject) => {
    let results = [];
    axios.get(`https://api.tvmaze.com/search/shows?q=${title}`)
      .then(response => {
        results = results.concat(parseTVSearchResults(response.data));
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d8ddc598dbea57864e979b53c2d12b0c&query=${title}`)
          .then(response => {
            results = results.concat(parseMovieSearchResults(response.data.results));
            return resolve(results);
          });
      });
  });
};

const addEpisodes = (watchListItem, id) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
      .then(response => {
        resolve(WatchListItem.addEpisodes(watchListItem, response.data));
      });
  });
}

const RootQuery = new GraphQLObjectType({
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
    searchResults: {
      type: new GraphQLList(WatchListItemType),
      args: { title: { type: GraphQLString } },
      resolve(parentValue, { title }) {
        return search(title);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: WatchListItemType,
      args: {
        tmdbID: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        language: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        if(args.type === "TV")
          return(addEpisodes(new WatchListItem(args), args.tmdbID));
        else
          return((new WatchListItem(args)).save());
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

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
