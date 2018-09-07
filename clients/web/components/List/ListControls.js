// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// App components
import Context from './ListContext'
import Icon from '../Icon/Icon'
import ListFilters from './ListFilters'
import ListSorter from './ListSorter'

// Styles
import './ListControls.css'

class ListControls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }
  toggleControls = () => {
    // Log the event.
    this.props.analytics.event({
      category: 'List Controls',
      action: 'Toggle Controls',
      label: !this.state.open,
    })

    this.setState({
      open: !this.state.open,
    })
  }
  renderIcon() {
    if (this.state.open) {
      return <Icon name="times" />
    }
    return <Icon name="cog" />
  }
  render() {
    return (
      <div className={this.state.open ? 'c-list-controls c-list-controls--is-open' : 'c-list-controls'}>
        <Context.Consumer>
          {context => (
            <div className={this.state.open ? 'c-list-controls-container c-list-controls-container--is-displayed u-display--grid' : 'c-list-controls-container u-display--grid'}>
              <ListFilters results={context.results} updateList={context.updateList} />
              <ListSorter
                defaultSort={context.defaultSort}
                sortOrder={context.sortOrder}
                updateList={context.updateList}
              />
            </div>
          )}
        </Context.Consumer>
        <button
          className="o-button o-button--plain o-button--white"
          onClick={this.toggleControls}
        >
          {this.renderIcon()}
        </button>
      </div>
    )
  }
}

export default ListControls

/**
 * Define the property types.
 * @type {Object}
 */
ListControls.propTypes = {
  analytics: PropTypes.object,
}

/**
 * Define default values for each property.
 * @type {Object}
 */
ListControls.defaultProps = {
  analytics: ReactGA,
}
