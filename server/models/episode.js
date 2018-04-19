const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * The DB Schema for a TV Show Episode.
 * @type {Schema}
 */
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

/**
 * Toggle a TV Show Episode as being watched or unwatched.
 * @param  {String} episodeID The ID (primary key) for the episode in the DB.
 * @return {Episode}          An instance of the Episode model for the given episode.
 */
EpisodeSchema.statics.toggleWatched = function(episodeID) {
  const Episode = mongoose.model('episode');
  return this.findById(episodeID)
    .then(episode => {
      episode.watched = !episode.watched;
      return episode.save();
    });
}

/**
 * Export the Model.
 */
mongoose.model('episode', EpisodeSchema);
