import createHistory from 'history/createBrowserHistory'

/**
 * Export the history object as a separate module so that it can be shared
 * in multiple components that may need to affect routing.
 */
export default createHistory()
