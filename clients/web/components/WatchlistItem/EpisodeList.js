// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App components
import Episode from './Episode'

/**
 * The Episode List component presents a list of episodes for a given TV watchlist
 * item, split by seasons.
 * @type {Object}
 */
export default class EpisodeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      episodes: props.episodes,
      seasons: this.getSeasons(), // Determine how many seasons the item has.
    }
  }
  /**
   * Compile a list of seasons.
   * @return {Array} The collection of seasons from the available episodes.
   */
  getSeasons() {
    const { episodes } = this.props
    const seasons = []
    for (let i = 0; i < episodes.length; i += 1) {
      if (!seasons.includes(episodes[i].seasonNumber)) {
        seasons.push(episodes[i].seasonNumber)
      }
    }
    return seasons
  }
  /**
   * Render each of the episodes for a given season.
   * @param  {Number} season The season for which episodes should be rendered.
   * @return {Object}        The rendered episodes.
   */
  renderEpisodes(season) {
    const episodes = this.state.episodes.filter(episode => episode.seasonNumber === season)
    return episodes.map(episode => (
      <Episode key={episode.id} {...episode} />
    ))
  }
  /**
   * Render the breadcrumb navigation for the available seasons.
   * @return {Object} The rendered breadcrumb navigation.
   */
  renderSeasonNavigation() {
    // Do not render anything if there is not more than 1 season.
    if (this.state.seasons.length < 2) {
      return ''
    }
    return this.state.seasons.map(season => (
      <li key={season} className="c-breadcrumbs-item">
        <a href={`#season${season}`}>{`Season ${season}`}</a>
      </li>
    ))
  }
  /**
   * Render the available seasons and all episodes for each.
   * @return {Object} The rendered seasons.
   */
  renderSeasons() {
    return this.state.seasons.map(season => (
      <li key={season} className="c-episodelist-season">
        <h2 id={`season${season}`}>Season {season}</h2>
        <ol className="u-unstyled-list">
          {this.renderEpisodes(season)}
        </ol>
      </li>
    ))
  }
  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    return (
      <div className="o-container c-episodelist">
        <ol className="c-breadcrumbs u-unstyled-list">
          {this.renderSeasonNavigation()}
        </ol>
        <ol className="u-unstyled-list">
          {this.renderSeasons()}
        </ol>
      </div>
    )
  }
}

/**
 * Define the property types.
 * @type {Object}
 */
EpisodeList.propTypes = {
  episodes: PropTypes.array,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
EpisodeList.defaultProps = {
  episodes: [],
}
