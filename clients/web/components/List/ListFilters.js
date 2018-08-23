// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App components
import ToggleButton from '../ToggleButton/ToggleButton'

// Styles
import './ListFilters.css'

/**
 * This component parses props in order to update the state object. The filter
 * options depend on the languages and types presented by the available list
 * items.
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
const getState = (props) => {
  const { results } = props

  // Get all languages from the results set.
  const languages = Array.from(new Set(results.map((result) => {
    if (result.language) {
      return result.language.toLowerCase()
    }
    return null
  }))).filter(result => result !== null && result !== 'unknown')

  // Get all types from the results set
  const types = Array.from(new Set(results.map((result) => {
    if (result.type) {
      return result.type.toLowerCase()
    }
    return null
  }))).filter(result => result !== null)

  // Return the state object
  return ({
    filters: languages.concat(types),
    languages,
    types,
  })
}

export default class ListFilters extends Component {
  constructor(props) {
    super(props)
    this.state = getState(props)
  }
  componentWillReceiveProps(nextProps) {
    this.setState(getState(nextProps))
  }
  /**
   * This function is called when the user toggles any filters.
   * @param  {String}   value   The filter being toggled.
   * @param  {Boolean}  checked The status of the filter, whether ON or OFF
   * @return {Boolean}          Dummy return value
   */
  changeFilter = (value, checked) => {
    const { filters } = this.state
    if (!checked && filters.indexOf(value) !== -1) {
      filters.splice(filters.indexOf(value), 1)
    }
    if (checked && filters.indexOf(value) === -1) {
      filters.push(value)
    }
    this.setState({ filters }, this.props.updateList({
      filters,
    }))
    return true
  }
  renderLanguageFilters() {
    // If there are not at least 2 languages, don't render anything.
    if (this.state.languages.length < 2) {
      return ''
    }
    return this.state.languages.map(language => (
      <ToggleButton
        className="u-margin-right--small"
        handleChange={this.changeFilter}
        key={language}
        value={language}
      />
    ))
  }
  renderTypeFilters() {
    // If there are not at least 2 types, don't render anything.
    if (this.state.types.length < 2) {
      return ''
    }

    return this.state.types.map((type) => {
      if (type === 'movie' || type === 'tv') {
        return (
          <ToggleButton
            handleChange={this.changeFilter}
            key={type}
            value={type}
          />
        )
      }
      return (
        <ToggleButton
          handleChange={this.changeFilter}
          key={type}
          value="TV"
        />
      )
    })
  }
  render() {
    return (
      <div className="c-list-filters">
        <div className="c-toggle-button-group u-display--flex u-margin-right--small">
          {this.renderTypeFilters()}
        </div>
        <div className="c-toggle-button-group">
          {this.renderLanguageFilters()}
        </div>
      </div>
    )
  }
}

/**
 * Define the types for each property.
 * @type {Object}
 */
ListFilters.propTypes = {
  updateList: PropTypes.func,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListFilters.defaultProps = {
  updateList: () => {},
}
