// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import EpisodeList from './WatchlistItem/EpisodeList'
import Header from './Header/Header'
import ListContainer from './List/ListContainer'
import SearchResults from './SearchResults'
import Watchlist from './Watchlist'
import WatchlistItem from './WatchlistItem'

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
      <Route path="/search/:query" component={SearchResults(ListContainer)} />
      <Route path="/watch/:id" component={WatchlistItem(EpisodeList)} />
      <Route component={Watchlist} />
    </Switch>
  </main>
)
