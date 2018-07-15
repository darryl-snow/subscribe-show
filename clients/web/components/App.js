// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import EpisodeList from './WatchlistItem/EpisodeList'
import Header from './Header/Header'
import List from './List/ListContainer'
import SearchResults from './SearchResults'
import UnwatchedItems from './UnwatchedItems'
import Watchlist from './Watchlist'
import WatchlistItem from './WatchlistItem'

/**
 * The main app component. The app contains a header and another component
 * below that which depends on the route.
 * @return {Object} The component to be rendered.
 */
export default () => (
  <div className="c-app">
    <Header />
    <Switch>
      <Route exact path="/" component={UnwatchedItems(List)} />
      <Route path="/search/:query" component={SearchResults(List)} />
      <Route exact path="/watch/" component={Watchlist(List)} />
      <Route exact path="/watch/:title" component={WatchlistItem(EpisodeList)} />
      <Route component={Watchlist} />
    </Switch>
  </div>
)
