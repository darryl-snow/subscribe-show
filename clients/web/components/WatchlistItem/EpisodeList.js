// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

const EpisodeList = ({ episodes }) => <h2>{episodes.length} Episodes</h2>

export default EpisodeList

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
