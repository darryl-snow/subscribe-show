// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import EpisodeList from './WatchlistItem/EpisodeList'
import Header from './Header/Header'
import HomePage from './Home/Home'
import List from './List/ListContainer'
import LoginForm from './Auth/Login'
import RegisterForm from './Auth/Register'
import RequireAuth from './Auth/RequireAuth'
import SearchResults from './SearchResults'
import Watchlist from './Watchlist'
import WatchlistItem from './WatchlistItem'

/**
 * The main app component. The app contains a header and another component
 * below that which depends on the route. This is rendered inside the Main
 * Content component, which is inside the App Container component.
 * @return {Object} The component to be rendered.
 */
export default () => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login/" component={LoginForm} />
      <Route exact path="/signup/" component={RegisterForm} />
      <Route exact path="/watch/" component={RequireAuth(Watchlist(List))} />
      <Route exact path="/watch/:title" component={RequireAuth(WatchlistItem(EpisodeList))} />
      <Route path="/search/:query" component={SearchResults(List)} />
    </Switch>
  </React.Fragment>
)
