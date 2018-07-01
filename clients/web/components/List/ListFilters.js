// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App components
import ToggleButton from '../ToggleButton/ToggleButton'

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
    return this.state.languages.map(language =>
      <ToggleButton key={language} value={language} handleChange={this.changeFilter} />)
  }
  renderTypeFilters() {
    return this.state.types.map(type =>
      <ToggleButton key={type} value={type} handleChange={this.changeFilter} />)
  }
  render() {
    return (
      <div className="c-list-filters">
        <div className="c-toggle-button-group">
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
  results: PropTypes.array,
  updateList: PropTypes.func,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListFilters.defaultProps = {
  results: [{}],
  updateList: () => {},
}
