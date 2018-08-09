// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import EpisodeList from './WatchlistItem/EpisodeList'
import Header from './Header/Header'
import Home from './Home'
import List from './List/ListContainer'
import Login from './Auth/Login'
import RequireAuth from './Auth/RequireAuth'
import SearchResults from './SearchResults'
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
      <Route exact path="/" component={Home} />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/watch/" component={RequireAuth(Watchlist(List))} />
      <Route exact path="/watch/:title" component={RequireAuth(WatchlistItem(EpisodeList))} />
      <Route path="/search/:query" component={SearchResults(List)} />
    </Switch>
  </div>
)
