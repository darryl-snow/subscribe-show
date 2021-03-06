const ASYNC = require('asyncawait/async')
const AWAIT = require('asyncawait/await')
const axios = require('axios')
const mongoose = require('mongoose')

const { errorName } = require('../services/errors')
const helpers = require('./helpers')
const keys = require('../../keys.json')
const winston = require('../winston-config')

const { Schema } = mongoose

/**
 * The DB Schema for a WatchList Item (TV Show or Movie).
 * @type {Schema}
 */
const WatchListItemSchema = new Schema({
  tmdbID: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: { type: String },
  image: { type: String },
  description: { type: String },
  airDate: { type: String },
  language: { type: String },
  type: { type: String },
  watched: { type: Boolean },
  isInWatchList: { type: Boolean },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'episode',
  }],
})

/**
 * Append a single episode to a watchlist item.
 * @param  {WatchListItem} item         The instance of the WatchListItem to
 *                                      which the episode should be appended.
 * @param  {Object} episodeToAdd        The episode object returned by the API.
 * @return {Episode}                    The newly created instance of the Episode model.
 */
const addEpisode = function(item, episodeToAdd) {
  const Episode = mongoose.model('episode')
  const episode = new Episode(helpers.parseEpisode(episodeToAdd))
  episode.watchListItem = item // Save which watchlist item this episode belongs to
  item.episodes.push(episode) // Append the episode to the watchlist item
  return episode
}

/**
 * Async function to retrieve and append all episodes to a TV Show watchlist item.
 * @param  {WatchListItem}   item The instance of the WatchListItem to which
 *                                episodes should be appended.
 * @param  {Function} next        Callback function for when all episode data
 *                                have been retreieved and appended.
 */
const addEpisodes = function(item, next) {
  // Get all episodes for the TV Show
  axios.get(`http://api.tvmaze.com/shows/${item.tmdbID}/episodes`)
    .then((response) => {
      const episodes = response.data

      // For each episode, create a new Episode record in the DB and append to the item
      episodes.forEach(ASYNC((episode) => {
        AWAIT(addEpisode(item, episode).save().catch((err) => {
          console.log(err)
          throw err.message
        }))
      }))

      next() // All episodes have been saved, proceed with saving the watchlist item
    }).catch((err) => {
      winston.error(err)
      throw err.message
    })
}

/**
 * Lookup and save the details for a given item, based on the ID provided from
 * the search results. Called as a pre-save hook for a watchlist item.
 * @param  {WatchListItem}   item The instance of the watchlist item to be saved.
 * @param  {Function} next        The callback function for when all required
 *                                details have been retrieved.
 * @returns {null}                Nothing
 */
const addItemDetails = function(item, next) {
  if (item.type === 'TV') {
    // Get TV Show item details
    axios.get(`http://api.tvmaze.com/shows/${item.tmdbID}`)
      .then((show) => {
        helpers.parseTVShow(show.data, item)
        addEpisodes(item, next) // Add all episodes to the watchlist item
      }).catch((err) => {
        winston.error(err)
        throw err.message
      })
  } else {
    // Get Movie item details
    axios.get(`https://api.themoviedb.org/3/movie/${item.tmdbID}?api_key=${keys.TMDB}`)
      .then((movie) => {
        helpers.parseMovie(movie.data, item)
        next() // Continue to save the item
      }).catch((err) => {
        winston.error(err)
        throw err.message
      })
  }
}

const isResultInWatchList = function(tmdbID, watchlist) {
  for(let i = 0; i < watchlist.length; i += 1) {
    if (watchlist[i].tmdbID === tmdbID.toString()) {
      return true
    }
  }
  return false
}

/**
 * Pre-save hook for the watchlist item - called before the item is saved or
 * updated in the DB. During this pre-save hook, we fetch all information about
 * the item.
 * @param  {Function} next The callback function to be called when all relevant
 *                         information has been retrieved and appended.
 */
WatchListItemSchema.pre('save', function (next) {
  const self = this
  // Ensure that a watchlist item with the same ID doesn't already exist
  mongoose.models.watchListItem.findOne({ tmdbID: self.tmdbID }, (err, item) => {
    if (err) {
      next(err) // Return a generic error
    } else if (item) { // An item with the same ID already exists
      if (self.title) { // If we already have the item details
        next() // Then save because we don't need to re-fetch
      } else {
        // Otherwise return an error because we are trying to add a fresh new
        // item that has the same ID as an existing one
        winston.error('This has already been added to your watchlist!')
        next(new Error('This hads already been added to your watchlist!'))
      }
    } else { // Add details to the item, then continue to save
      addItemDetails(self, next)
    }
  })
})

/**
 * Search for potential watchlist items (TV Shows or Movies) based on a given item title.
 * @param  {String} title The search query
 * @return {Promise}      The search results.
 */
WatchListItemSchema.statics.search = function (title) {
  return new Promise((resolve) => {
    let results = []

    // Search for TV Shows with the given title
    axios.get(`https://api.tvmaze.com/search/shows?q=${title}`)
      .then((TVResponse) => {
        // Append parsed response collection to the results set
        results = results.concat(helpers.parseSearchResults(TVResponse.data))

        // Search for Movies with the given title
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keys.TMDB}&query=${title}`)
          .then((MovieResponse) => {
            // Append parsed response collection to the results set
            results = results.concat(helpers.parseSearchResults(MovieResponse.data.results))

            // now cross reference the results against the watchlist
            this.find().then((watchListItems) => {

              for (let i = 0; i < results.length; i += 1) {
                if (isResultInWatchList(results[i].tmdbID, watchListItems)) {
                  results[i].isInWatchList = true
                } else {
                  results[i].isInWatchList = false
                }
              }
              return resolve(results)
            })
          }).catch((err) => {
            winston.error(err)
            throw err.message
          })
      })
  })
}

/**
 * Check if all episodes of a given TV watchlist item are watched if so, the
 * watchlist item should also be marked as watched.
 * @param  {ID} id The ID for the watchlist item.
 */
WatchListItemSchema.statics.checkIfWatched = function (id) {
  return this.findById(id)
    .populate('episodes')
    .then((watchListItem) => {
      // Get all episodes for the watchlist item.
      const episodes = watchListItem.episodes
      const watched = watchListItem.watched

      // Assume all have been watched. If any have not been watched, then
      // the item should not be marked as watched.
      let allEpisodesWatched = true
      for (let i = 0; i < episodes.length; i += 1) {
        if (!episodes[i].watched) {
          allEpisodesWatched = false
        }
      }
      // If there's a different between the item's current watched state and
      // whether all episodes have been watched, then update the item, otherwise
      // just return the item as is.
      if(allEpisodesWatched !== watched) {
        watchListItem.watched = allEpisodesWatched
        return watchListItem.save()
      } else {
        return watchListItem
      }
    })
    .catch((err) => {
      winston.error(err)
    })
}

WatchListItemSchema.statics.findByTitle = function (slug) {
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  return this.findOne({ title: { $regex: new RegExp(title, 'i') } })
    .then(item => item)
    .catch((err) => {
      winston.error(err)
      throw err.message
    })
}

/**
 * Retrieve all saved episodes for a given watchlist item.
 * @param  {String} id The primary key for a given watchlist item
 * @return {Array}     The episodes for the given item.
 */
WatchListItemSchema.statics.getAllEpisodes = function (id) {
  return this.findById(id)
    .populate('episodes')
    .then(watchListItem => watchListItem.episodes)
    .catch((err) => {
      winston.error(err)
      throw err.message
    })
}

/**
 * Toggle a Watchlist item as being watched or unwatched.
 * @param  {String} watchListItemID The ID (primary key) for the item in the DB.
 * @return {WatchListItem}          An instance of the WatchListItem model for the given item.
 */
WatchListItemSchema.statics.toggleWatched = function (watchListItemID) {
  return this.findById(watchListItemID)
    .then((watchListItem) => {
      watchListItem.watched = !watchListItem.watched
      return watchListItem.save()
    }).catch((err) => {
      winston.error(err)
      throw err.message
    })
}

/**
 * Export the Model.
 */
mongoose.model('watchListItem', WatchListItemSchema)
