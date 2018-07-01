// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import ListFilters from './ListFilters'
import ListSorter from './ListSorter'

/**
 * The ListHeader component, which contains a subheader any controls such as
 * sort and filter options. It's a stateless component.
 */
const ListHeader = (props) => {
  const {
    content,
    defaultSort,
    results,
    sortOrder,
    updateList,
  } = props

  return (
    <header className={`${props.className} c-list-header`}>
      <h2>{content}</h2>
      <div className="c-list-header-controls">
        <ListFilters results={results} updateList={updateList} />
        <ListSorter
          defaultSort={defaultSort}
          sortOrder={sortOrder}
          updateList={updateList}
        />
      </div>
    </header>
  )
}

export default ListHeader

/**
 * Define the property types.
 * @type {Object}
 */
ListHeader.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  defaultSort: PropTypes.string,
  results: PropTypes.array,
  sortOrder: PropTypes.number,
  updateList: PropTypes.func,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
ListHeader.defaultProps = {
  className: '',
  content: '',
  defaultSort: '',
  results: [],
  sortOrder: 1,
  updateList: () => {},
}
