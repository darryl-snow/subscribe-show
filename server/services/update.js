const ASYNC = require('asyncawait/async')
const AWAIT = require('asyncawait/await')
const axios = require('axios')
const helpers = require('../models/helpers')
const mongoose = require('mongoose')
const winston = require('../winston-config')

const Episode = mongoose.model('episode')
const WatchListItem = mongoose.model('watchListItem')

const getShows = () => WatchListItem.find({ type: 'TV' })

const getSavedEpisodesForShow = show => show.episodes

const getSavedEpisodeDetails = episodeID => Episode.findById(episodeID)

const getAllEpisodesForShow = tmdbID => axios.get(`http://api.tvmaze.com/shows/${tmdbID}/episodes`)
  .then(episodes => episodes)
  .catch((err) => {
    winston.error(err)
    throw err.message
  })

const getEpisodesForShows = ASYNC(() => {
  const shows = AWAIT(getShows().then(data => data))
  const returnShows = []

  for (let i = 0; i < shows.length; i += 1) {
    const episodeIDs = getSavedEpisodesForShow(shows[i])
    const savedEpisodes = []

    for (let j = 0; j < episodeIDs.length; j += 1) {
      const episodeDetails = AWAIT(getSavedEpisodeDetails(episodeIDs[j]))
      if (episodeDetails !== null) {
        savedEpisodes.push(episodeDetails)
      }
    }

    const allEpisodes = AWAIT(getAllEpisodesForShow(shows[i].tmdbID))

    // console.log('----Saved episodes----')
    // console.log(savedEpisodes)

    // console.log('----All episodes----')
    // console.log(allEpisodes)

    returnShows.push({
      id: shows[i].id,
      all: allEpisodes.data,
      saved: savedEpisodes,
    })
  }

  return returnShows
})

const addEpisode = ASYNC((id, episodeToAdd) => {
  console.log('adding')
  const watchlistItem = AWAIT(WatchListItem.findById(id).then(item => item))
  const episode = new Episode(helpers.parseEpisode(episodeToAdd))

  episode.watchListItem = watchlistItem
  episode.save()

  watchlistItem.episodes.push(episode)
  watchlistItem.save()
})

const compareSavedEpisodes = ASYNC(() => {
  const shows = AWAIT(getEpisodesForShows())

  for (let i = 0; i < shows.length; i += 1) {
    const allEpisodes = shows[i].all
    const savedEpisodes = shows[i].saved

    for (let j = 0; j < allEpisodes.length; j += 1) {
      const matchingEpisodes = savedEpisodes.filter(episode =>
        episode.tmdbEpisodeID === allEpisodes[j].id.toString())
      if (!matchingEpisodes.length) {
        addEpisode(shows[i].id, allEpisodes[j])
      }
    }
  }
})

module.exports = compareSavedEpisodes
