import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Watchlist from './Watchlist';
import SearchResults from './SearchResults';

export default () => {
  return (
    <main>
      <Header />

      <Switch>
        <Route exact path="/" component={Watchlist} />
        <Route path="/search" component={SearchResults} />
        <Route path="/search/:query" component={SearchResults} />
        <Route component={Watchlist} />
      </Switch>
    </main>
  );
};
