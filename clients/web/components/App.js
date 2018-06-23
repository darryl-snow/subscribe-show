// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import Header from './Header'
import ListContainer from './ListContainer'
import SearchResults from './SearchResults'
import Watchlist from './Watchlist'
import WatchlistItemDetail from './WatchlistItemDetail'

/**
 * The main app component. The app contains a header and another component
 * below that which depends on the route.
 * @return {Object} The component to be rendered.
 */
export default () => (
  <main>
    <Header />
    <Switch>
      <Route exact path="/" component={Watchlist(ListContainer)} />
      <Route path="/search" component={SearchResults(ListContainer)} />
      <Route path="/search/:query" component={SearchResults} />
      <Route path="/watch/:id" component={WatchlistItemDetail} />
      <Route component={Watchlist} />
    </Switch>
  </main>
)
