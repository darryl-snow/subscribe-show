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

const addItemDetails = function(item, next) {

  if(item.type === "TV") {

    axios.get(`http://api.tvmaze.com/shows/${item.tmdbID}`)
      .then(show => {
        helpers.parseTVShow(show.data, item);
        addEpisodes(item, next);
      });

  } else {

    axios.get(`https://api.themoviedb.org/3/movie/${item.tmdbID}?api_key=${keys.TMDB}`)
      .then(movie => {
        helpers.parseMovie(movie.data, item);
        next();
      });

  }

};

const addEpisodes = async (function(item, next) {

  axios.get(`http://api.tvmaze.com/shows/${item.tmdbID}/episodes`)
    .then(response => {
      const episodes = response.data;

      episodes.forEach(async (episode) => {
        await (addEpisode(item, episode).save());
      });

      next();

    });

});

const addEpisode = function(item, episodeToAdd) {
  const Episode = mongoose.model('episode');
  let episode = new Episode(helpers.parseEpisode(episodeToAdd));
  episode.watchListItem = item;
  item.episodes.push(episode);
  return episode;
};

WatchListItemSchema.pre('save', function(next) {
  const watchListItem = this;
  addItemDetails(watchListItem, next);
});

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

WatchListItemSchema.statics.findEpisodes = function(id) {
  return this.findById(id)
    .populate('episodes')
    .then(watchListItem => watchListItem.episodes);
}

mongoose.model('watchListItem', WatchListItemSchema);
