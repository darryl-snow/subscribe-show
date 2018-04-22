import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Watchlist from './Watchlist';

export default () => {
  return (
    <main>
      <Header />
      <Switch>
        <Route exact path="/" component={Watchlist} />
      </Switch>
    </main>
  );
};
