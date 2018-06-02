// Dependencies
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// App components
import Header from './Header'
import Watchlist from './Watchlist'
import SearchResults from './SearchResults'

/**
 * The main app component. The app contains a header and another component
 * below that which depends on the route.
 * @return {Object} The component to be rendered.
 */
export default () => (
  <main>
    <Header />
    <Switch>
      <Route exact path="/" component={Watchlist} />
      <Route path="/search" component={SearchResults} />
      <Route path="/search/:query" component={SearchResults} />
      <Route component={Watchlist} />
    </Switch>
  </main>
)
