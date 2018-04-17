const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const WatchListItemSchema = new Schema({
  tmdbID: { type: String },
  title: { type: String },
  image: { type: String },
  description: { type: String },
  language: { type: String },
  type: { type: String },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'episode'
  }]
});

WatchListItemSchema.statics.getID = function(id) {
  return this.findById(id)
    .then(watchListItem => watchListItem.tmdbID);
}

WatchListItemSchema.statics.addEpisode = function(args) {
  const Episode = mongoose.model('episode');
  const { watchListItemID, tmdbEpisodeID, seasonNumber, episodeNumber, airDate, name, description, image, watched } = args;
  return this.findById(watchListItemID)
    .then(watchListItem => {
      const episode = new Episode({ watchListItem, tmdbEpisodeID, seasonNumber, episodeNumber, airDate, name, description, image, watched });
      watchListItem.episodes.push(episode);
      return Promise.all([episode.save(), watchListItem.save()])
        .then(([episode, watchListItem]) => watchListItem);
    });
}

const processEpisode = async (function (watchListItem, episode) {
  const Episode = mongoose.model('episode');
  let newEpisode = new Episode({
    watchListItem: watchListItem,
    tmdbEpisodeID: episode.id,
    seasonNumber: episode.season,
    episodeNumber: episode.number,
    airDate: episode.airdate,
    name: episode.name,
    description: episode.summary,
    image: episode.image ? episode.image.original : null,
    watched: false
  });
  watchListItem.episodes.push(newEpisode);
  await (newEpisode.save());
});

const processEpisodes = async (function (watchListItem, episodes) {
  episodes.forEach(async (episode) => {
    await (processEpisode(watchListItem, episode));
  });
});

WatchListItemSchema.statics.addEpisodes = function(watchListItem, episodes) {
  processEpisodes(watchListItem, episodes);
  return new Promise((resolve, reject) => {
    resolve(watchListItem.save());
  });
}

WatchListItemSchema.statics.findEpisodes = function(id) {
  return this.findById(id)
    .populate('episodes')
    .then(watchListItem => watchListItem.episodes);
}

mongoose.model('watchListItem', WatchListItemSchema);
