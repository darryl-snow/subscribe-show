const async = require('asyncawait/async');
const await = require('asyncawait/await');
const axios = require('axios');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helpers = require('./helpers');
const keys = require('../../keys.json');

const WatchListItemSchema = new Schema({
  tmdbID: { type: String },
  title: { type: String },
  image: { type: String },
  description: { type: String },
  airDate: { type: String },
  language: { type: String },
  type: { type: String },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'episode'
  }]
});

// WatchListItemSchema.statics.getID = function(id) {
//   return this.findById(id)
//     .then(watchListItem => watchListItem.tmdbID);
// }

// WatchListItemSchema.statics.addEpisode = function(args) {
//   const Episode = mongoose.model('episode');
//   const { watchListItemID, tmdbEpisodeID, seasonNumber, episodeNumber, airDate, name, description, image, watched } = args;
//   return this.findById(watchListItemID)
//     .then(watchListItem => {
//       const episode = new Episode({ watchListItem, tmdbEpisodeID, seasonNumber, episodeNumber, airDate, name, description, image, watched });
//       watchListItem.episodes.push(episode);
//       return Promise.all([episode.save(), watchListItem.save()])
//         .then(([episode, watchListItem]) => watchListItem);
//     });
// }

// const processEpisode = async (function (watchListItem, episode) {
//   const Episode = mongoose.model('episode');
//   let newEpisode = new Episode({
//     watchListItem: watchListItem,
//     tmdbEpisodeID: episode.id,
//     seasonNumber: episode.season,
//     episodeNumber: episode.number,
//     airDate: episode.airdate,
//     name: episode.name,
//     description: episode.summary,
//     image: episode.image ? episode.image.original : null,
//     watched: false
//   });
//   watchListItem.episodes.push(newEpisode);
//   await (newEpisode.save());
// });
//
// const processEpisodes = async (function (watchListItem, episodes) {
//   episodes.forEach(async (episode) => {
//     await (processEpisode(watchListItem, episode));
//   });
// });
//
// const addEpisodes = (watchListItem, id) => {
//   return new Promise((resolve, reject) => {
//     axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
//       .then(response => {
//         resolve(WatchListItem.addEpisodes(watchListItem, response.data));
//       });
//   });
// }

// WatchListItemSchema.statics.addEpisodes = function(watchListItem, episodes) {
//   processEpisodes(watchListItem, episodes);
//   return new Promise((resolve, reject) => {
//     resolve(watchListItem.save());
//   });
// }

const createItem = async function(id, type) {

  const watchListItem = new this();

  if(type === "TV") {

    axios.get(`http://api.tvmaze.com/shows/${id}`)
      .then(show => {
        watchListItem.tmdbID = show.id;
        watchListItem.title = show.name;
        if(show.image)
          watchListItem.image = show.image.original;
        watchListItem.description = show.summary;
        watchListItem.language = show.language;
        watchListItem.type = type;
        return watchListItem;
      });

  } else {

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${keys.TMDB}`)
      .then(movie => {
        watchListItem.tmdbID = movie.id;
        watchListItem.title = movie.title;
        watchlistitem.image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        watchListItem.description = movie.summary;
        watchListItem.language = helpers.parseLanguage(movie.language);
        watchListItem.type = type;
        return watchListItem;
      });

  }

}

const getEpisodes = async function(id) {

}

const addEpisodesToItem = async function(watchListItem, episodes) {

}

WatchListItemSchema.statics.search = function(title) {
  return new Promise((resolve, reject) => {
    let results = [];
    axios.get(`https://api.tvmaze.com/search/shows?q=${title}`)
      .then(response => {
        results = results.concat(helpers.parseSearchResults(response.data));
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keys.TMDB}&query=${title}`)
          .then(response => {
            results = results.concat(helpers.parseSearchResults(response.data.results));
            return resolve(results);
          });
      });
  });
}

WatchListItemSchema.statics.addItem = function(id, type) {


  const watchListItem = await (createItem(id, type));

  if (type === "TV") {
    const episodes = await (getEpisodes(id));
    await (addEpisodesToItem(watchListItem, episodes));
  }

  return new Promise((resolve, reject) => {

    resolve(watchListItem.save());

  });

  // get item from api
  // if tv, then get episodes for item
  // create new watchlistitem
  // create episide / add each episode to item
  // save item
  // return item
}

WatchListItemSchema.statics.findEpisodes = function(id) {
  return this.findById(id)
    .populate('episodes')
    .then(watchListItem => watchListItem.episodes);
}

mongoose.model('watchListItem', WatchListItemSchema);
