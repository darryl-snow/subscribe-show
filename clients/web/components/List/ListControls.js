// Dependencies
import React, { Component } from 'react'

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
            <div className={this.state.open ? 'c-list-controls-container c-list-controls-container--is-displayed' : 'c-list-controls-container'}>
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
