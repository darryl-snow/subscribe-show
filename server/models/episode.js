const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  watchListItem: {
    type: Schema.Types.ObjectId,
    ref: 'watchListItem'
  },
  tmdbEpisodeID: { type: String },
  seasonNumber: { type: Number },
  episodeNumber: { type: Number },
  airDate: { type: Date },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  watched: { type: Boolean, default: false }
});

EpisodeSchema.statics.toggleWatched = function(episodeID) {
  const Episode = mongoose.model('episode');
  return this.findById(episodeID)
    .then(episode => {
      episode.watched = !episode.watched;
      return episode.save();
    });
}

mongoose.model('episode', EpisodeSchema);
